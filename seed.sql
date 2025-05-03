-- seed.sql - Seed data for Andaman Travel Platform


-- seed.sql

-- Clear existing data (Uncomment lines below to reset tables)
DELETE FROM booking_services;
DELETE FROM bookings;
DELETE FROM reviews;
DELETE FROM packages;
DELETE FROM services; -- Delete services BEFORE providers
DELETE FROM service_providers; -- Delete providers BEFORE users
DELETE FROM ferry_schedules;
DELETE FROM ferries;
DELETE FROM permits;
DELETE FROM islands;
DELETE FROM users WHERE email NOT LIKE 'admin@%'; -- Keep admin user (ID 1)

PRAGMA foreign_keys=OFF; -- Temporarily disable FK checks during seeding

-- ... (Rest of your INSERT statements) ...



-- =============================================
-- Roles (Already seeded by migration 0001, but included for completeness if needed)
-- =============================================
-- INSERT OR IGNORE INTO roles (id, name, description, permissions) VALUES
--   (1, 'admin', 'Administrator with full access', 'all'),
--   (2, 'user', 'Regular user/traveler', 'basic'),
--   (3, 'vendor', 'Service provider/vendor', 'vendor');

-- =============================================
-- Users (Admin seeded by migration 0001)
-- Note: Passwords here use a placeholder hash for 'password'.
-- Replace 'placeholder_bcrypt_hash_for_password' with a real hash if needed for login testing,
-- or update them after creation via an API or direct DB command.
-- A common hash for 'password' (cost 10) is: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
-- =============================================
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, role_id) VALUES
  (2, 'testuser@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Test', 'User', '9876543210', 2),
  (3, 'scubavendor@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Scuba', 'Vendor', '9876543211', 3),
  (4, 'hotelvendor@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Hotel', 'Manager', '9876543212', 3);

-- =============================================
-- Islands
-- =============================================
INSERT INTO islands (id, name, description, permit_required, images) VALUES
  (1, 'Port Blair', 'The capital city and entry point to the Andaman Islands, known for its historical significance and cellular jail.', 0, '/images/portblair/hero.webp'),
  (2, 'Havelock Island (Swaraj Dweep)', 'Famous for its stunning beaches like Radhanagar Beach (Beach No. 7) and clear waters ideal for water sports.', 0, '/images/havelock/hero.webp'),
  (3, 'Neil Island (Shaheed Dweep)', 'A smaller, quieter island known for its relaxed vibe, natural bridge formations, and beautiful beaches like Laxmanpur and Bharatpur.', 0, '/images/neil/hero.webp'),
  (4, 'Baratang Island', 'Known for its unique mangrove creeks, limestone caves, and mud volcanoes. Requires permits.', 1, '/images/baratang/hero.webp');
  
-- =============================================
-- Service Providers (Link users with role 'vendor' to businesses)
-- Assume user IDs: 3=scubavendor, 4=hotelvendor
-- =============================================
INSERT INTO service_providers (id, user_id, business_name, type, address, verified, bank_details) VALUES
  (1, 3, 'Andaman Scuba Experts', 'activity_provider', 'Beach No. 3, Havelock Island', 1, '{"account_no": "123", "ifsc": "ABC"}'),
  (2, 4, 'SeaShell Port Blair', 'accommodation', 'Marine Hill, Port Blair', 1, '{"account_no": "456", "ifsc": "DEF"}'),
  (3, 3, 'Havelock Snorkeling Tours', 'activity_provider', 'Jetty Area, Havelock Island', 1, '{"account_no": "789", "ifsc": "GHI"}'); -- Same vendor, different service type focus

-- =============================================
-- Services (Link providers to specific offerings on islands)
-- Assume Provider IDs: 1=Scuba Experts, 2=SeaShell, 3=Snorkeling Tours
-- Assume Island IDs: 1=Port Blair, 2=Havelock, 3=Neil
-- =============================================
INSERT INTO services (id, name, description, type, provider_id, island_id, price, images, availability, amenities) VALUES
  (1, 'Beginner Scuba Dive (Shore Dive)', 'Experience the underwater world near Havelock shore. Includes basic training and guide.', 'activity', 1, 2, '3500', '/images/scuba.jpg', 'Daily 9am, 1pm', 'Equipment, Instructor'),
  (2, 'Snorkeling Trip to Elephant Beach', 'Boat trip to Elephant Beach with snorkeling gear provided. See vibrant corals.', 'activity', 3, 2, '1500', '/images/snorkeling.jpg', 'Daily 10am', 'Boat, Snorkel Gear, Guide'),
  (3, 'Standard Room - SeaShell PB', 'Comfortable AC room with essential amenities in Port Blair.', 'accommodation', 2, 1, '5500', '/images/seashell_room.jpg', 'Year-round', 'AC, WiFi, TV, Restaurant'),
  (4, 'Advanced Open Water Course', 'PADI certified course for experienced divers.', 'activity', 1, 2, '18000', '/images/scuba-advanced.jpg', 'On Request', 'Equipment, Certification, Instructor'),
  (5, 'Glass Bottom Boat Ride', 'View corals and fish without getting wet at Bharatpur Beach.', 'activity', 3, 3, '1200', '/images/glass-boat.jpg', 'Daily 11am, 2pm', 'Boat, Guide'); -- Added service on Neil Island

-- =============================================
-- Packages (Combine islands/services into bookable trips)
-- created_by uses Admin User ID (1)
-- included_services can be descriptive text or JSON array of service IDs
-- =============================================
INSERT INTO packages (id, name, description, duration, base_price, max_people, created_by, is_active, itinerary, included_services, images) VALUES
  (1, '3 Days Port Blair & Havelock Excursion', 'Explore Port Blair''s history with Cellular Jail and Corbyn''s Cove, witness the Light & Sound Show, and take an excursion to Havelock''s famed Radhanagar Beach.', '3 Days / 2 Nights', 20020, 2, 1, 1,
    '{
      "highlights": ["Cellular Jail Visit", "Light & Sound Show", "Corbyn''s Cove Beach", "Havelock Excursion", "Radhanagar Beach"],
      "inclusions": ["Airport Transfers", "Private AC Cab for sightseeing", "Accommodation (Port Blair)", "Breakfast", "Cruise tickets to Havelock (Round Trip)", "Entry tickets"],
      "exclusions": ["Flight Tickets", "Lunch & Dinner", "Water sports charges", "Personal expenses", "Anything not mentioned in inclusions"],
      "days": [
        {"day": 1, "title": "Arrival, Corbyn''s Cove Beach & Cellular Jail Light and Sound Show", "description": "Arrival at Port Blair airport, transfer to hotel. Post-lunch, visit Cellular Jail (Kala Paani) and Corbyn''s Cove Beach. Evening Light and Sound Show at Cellular Jail. Return to hotel.", "activities": [{"name": "Cellular Jail Visit"}, {"name": "Corbyn''s Cove Beach Visit"}, {"name": "Light and Sound Show"}], "meals": [], "accommodation": "Port Blair Hotel"},
        {"day": 2, "title": "Excursion to Swaraj Dweep (Havelock Island)", "description": "Early pickup (7:00 AM) for 8:00 AM cruise to Swaraj Dweep (Havelock). Arrive ~9:45 AM. Cab whisks you to Radhanagar Beach (Asia''s 7th best). Relax and soak in the beauty. Evening cruise back to Port Blair.", "activities": [{"name": "Cruise to Havelock"}, {"name": "Radhanagar Beach Visit"}, {"name": "Return Cruise to Port Blair"}], "meals": ["Breakfast"], "accommodation": "Port Blair Hotel"},
        {"day": 3, "title": "Return Home with Sweet Memory", "description": "After breakfast, check out and proceed to the airport for your departure flight. Optional last-minute shopping if time permits.", "activities": [{"name": "Airport Transfer"}], "meals": ["Breakfast"], "accommodation": null}
      ]
    }',
    '["Accommodation", "Transfers", "Breakfast", "Sightseeing", "Cruise Tickets"]',
    '/images/andaman_3d_1.jpg,/images/cellular_jail.jpg,/images/radhanagar.jpg'
  );
  INSERT INTO packages (id, name, description, duration, base_price, max_people, created_by, is_active, itinerary, included_services, images) VALUES
  (2, '5 Days with Barren Island', 'An adventurous trip covering Port Blair''s history, Havelock''s beaches (Kalapathar, Radhanagar), an exciting excursion to Barren Island for snorkeling/fishing, Elephant Beach, and Chidiyatapu sunset.', '5 Days / 4 Nights', 88880, 2, 1, 1,
    '{
      "highlights": ["Cellular Jail", "Corbyn''s Cove", "Havelock Island", "Kalapathar Beach", "Radhanagar Beach", "Barren Island Excursion", "Snorkeling & Fishing", "Elephant Beach", "Chidiyatapu Sunset"],
      "inclusions": ["Private AC Cab Transfers (as per itinerary)", "Accommodation (2N Port Blair, 2N Havelock)", "Breakfast", "Cellular Jail Entry & Light/Sound Show Tickets", "Cruise Tickets (PB-Hav, Hav-PB)", "Speed Boat to Barren Island", "Boat Ride to Elephant Beach", "Snorkeling/Fishing at Barren Island", "Refreshments on Barren Trip"],
      "exclusions": ["Flight Tickets", "Lunch & Dinner (except Day 3)", "Barren Island Permit Charges (INR 500/2500)", "Other Water Sports", "Personal Expenses", "Anything not mentioned"],
      "days": [
        {"day": 1, "title": "Airport Pickup, Corbyn Cove Beach & Light and Sound Show", "description": "Arrive Port Blair, transfer to hotel. Post-lunch visit Cellular Jail & Corbyn''s Cove. Evening Light & Sound show. Back to hotel.", "activities": [{"name": "Cellular Jail Visit"}, {"name": "Corbyn''s Cove Visit"}, {"name": "Light and Sound Show"}], "meals": [], "accommodation": "Port Blair Hotel"},
        {"day": 2, "title": "Explore Swaraj Dweep (Havelock) Island & Overnight Stay", "description": "Early cruise (8 AM) to Havelock. Arrive 9:45 AM, check into hotel. Visit Kalapathar Beach. Post-lunch visit Radhanagar Beach for sunset.", "activities": [{"name": "Cruise to Havelock"}, {"name": "Kalapathar Beach Visit"}, {"name": "Radhanagar Beach Visit"}], "meals": ["Breakfast"], "accommodation": "Havelock Resort"},
        {"day": 3, "title": "Adventurous Trip to Barren Island", "description": "Depart Havelock Jetty 5 AM via speed boat to Barren Island. Enjoy snorkeling & game fishing (10 hrs trip incl. travel). Breakfast, lunch, refreshments provided.", "activities": [{"name": "Barren Island Excursion"}, {"name": "Snorkeling"}, {"name": "Game Fishing"}], "meals": ["Breakfast", "Lunch", "Refreshments"], "accommodation": "Havelock Resort"},
        {"day": 4, "title": "Return from Swaraj Dweep & Chidiyataapu Sunset", "description": "Breakfast. 7:45 AM depart Havelock Jetty via speedboat to Elephant Beach (snorkeling/sea walking opt.). Return jetty for lunch. 1:30 PM cruise to Port Blair. Check-in hotel. Visit Chidiyatapu Beach for sunset.", "activities": [{"name": "Elephant Beach Visit"}, {"name": "Cruise to Port Blair"}, {"name": "Chidiyatapu Sunset Point"}], "meals": ["Breakfast"], "accommodation": "Port Blair Hotel"},
        {"day": 5, "title": "Departure with Fond Memories", "description": "After breakfast, transfer to Port Blair airport for departure.", "activities": [{"name": "Airport Transfer"}], "meals": ["Breakfast"], "accommodation": null}
      ]
    }',
    '["Accommodation", "Private AC Cab", "Breakfast", "Sightseeing", "Cruise Tickets", "Boat Tickets", "Entry Tickets", "Specified Activities"]',
    '/images/andaman_5d_barren_1.jpg,/images/barren_island.jpg,/images/kalapathar.jpg,/images/chidiyatapu.jpg'
  );
  INSERT INTO packages (id, name, description, duration, base_price, max_people, created_by, is_active, itinerary, included_services, images) VALUES
  (3, '5 Days Port Blair, Havelock & Neil', 'Explore the best of three islands: Port Blair''s history, Havelock''s Radhanagar & Kalapathar beaches, and Neil Island''s Bharatpur, Laxmanpur & Sitapur beaches, plus Chidiyatapu sunset.', '5 Days / 4 Nights', 36465, 2, 1, 1,
    '{
      "highlights": ["Cellular Jail", "Corbyn''s Cove", "Havelock (Swaraj Dweep)", "Kalapathar Beach", "Radhanagar Beach", "Neil Island (Shaheed Dweep)", "Bharatpur Beach", "Laxmanpur Beach", "Sitapur Beach Sunrise", "Chidiyatapu Sunset"],
      "inclusions": ["Private AC Cab Transfers (as per itinerary)", "Accommodation (2N Port Blair, 1N Havelock, 1N Neil)", "Breakfast", "Cellular Jail Entry & Light/Sound Show Tickets", "Cruise Tickets (PB-Hav, Hav-Neil, Neil-PB)"],
      "exclusions": ["Flight Tickets", "Lunch & Dinner", "Water sports charges (Jet Ski, Glass Bottom Boat etc.)", "Personal Expenses", "Anything not mentioned"],
      "days": [
        {"day": 1, "title": "Airport Pickup, Corbyn Cove Beach & Light and Sound Show", "description": "Arrive Port Blair, transfer to hotel. Post-lunch visit Cellular Jail & Corbyn''s Cove. Evening Light & Sound show.", "activities": [{"name": "Cellular Jail Visit"}, {"name": "Corbyn''s Cove Visit"}, {"name": "Light and Sound Show"}], "meals": [], "accommodation": "Port Blair Hotel"},
        {"day": 2, "title": "Explore Swaraj Dweep (Havelock) Island & Overnight Stay", "description": "Early cruise (8 AM) to Havelock. Arrive 9:45 AM, check into hotel. Visit Kalapathar Beach. Post-lunch visit Radhanagar Beach for sunset.", "activities": [{"name": "Cruise to Havelock"}, {"name": "Kalapathar Beach Visit"}, {"name": "Radhanagar Beach Visit"}], "meals": ["Breakfast"], "accommodation": "Havelock Resort"},
        {"day": 3, "title": "Journey to Shaheed Dweep (Neil Island)", "description": "Breakfast, check out. 10:15 AM cruise from Havelock to Neil Island. Arrive 11:15 AM, check into hotel. Visit Bharatpur Beach (water sports optional) & Laxmanpur Beach for sunset.", "activities": [{"name": "Cruise to Neil Island"}, {"name": "Bharatpur Beach Visit"}, {"name": "Laxmanpur Beach Visit"}], "meals": ["Breakfast"], "accommodation": "Neil Resort"},
        {"day": 4, "title": "Return from Neil Island & Chidiyatapu Sunset Point", "description": "Early morning (4 AM) visit Sitapur Beach for sunrise. Return for breakfast, check out. 11:30 AM cruise Neil to Port Blair. Arrive 12:40 PM, check into hotel. Post-lunch visit Chidiyatapu (Bird Sanctuary, Mini Zoo, Mundapahad Beach sunset).", "activities": [{"name": "Sitapur Beach Sunrise Visit"}, {"name": "Cruise to Port Blair"}, {"name": "Chidiyatapu Visit"}], "meals": ["Breakfast"], "accommodation": "Port Blair Hotel"},
        {"day": 5, "title": "Departure with Fond Memories", "description": "After breakfast, transfer to Port Blair airport for departure.", "activities": [{"name": "Airport Transfer"}], "meals": ["Breakfast"], "accommodation": null}
      ]
    }',
    '["Accommodation", "Private AC Cab", "Breakfast", "Sightseeing", "Cruise Tickets", "Entry Tickets"]',
    '/images/andaman_5d_neil_1.jpg,/images/neil_island.jpg,/images/bharatpur.jpg,/images/laxmanpur.jpg'
  );
  INSERT INTO packages (id, name, description, duration, base_price, max_people, created_by, is_active, itinerary, included_services, images) VALUES
  (4, '6 Days Port Blair, Havelock & Neil', 'A comprehensive tour featuring Port Blair, 2 nights in Havelock including Radhanagar, Kalapathar & Elephant Beach (snorkeling included!), 1 night in Neil Island exploring its beaches, and Chidiyatapu sunset.', '6 Days / 5 Nights', 43175, 2, 1, 1,
    '{
      "highlights": ["Cellular Jail", "Corbyn''s Cove", "Havelock (2N Stay)", "Kalapathar Beach", "Radhanagar Beach", "Elephant Beach", "Complimentary Snorkeling", "Neil Island Stay", "Bharatpur Beach", "Laxmanpur Beach", "Sitapur Beach Sunrise", "Chidiyatapu Sunset"],
      "inclusions": ["Private AC Cab Transfers (as per itinerary)", "Accommodation (2N Port Blair, 2N Havelock, 1N Neil)", "Breakfast", "Cellular Jail Entry & Light/Sound Show Tickets", "Cruise Tickets (PB-Hav, Hav-Neil, Neil-PB)", "Speedboat to Elephant Beach", "Complimentary Snorkeling at Elephant Beach"],
      "exclusions": ["Flight Tickets", "Lunch & Dinner", "Optional Activities (Scuba, Sea Walking, Jet Ski, Glass Bottom Boat etc.)", "Personal Expenses", "Anything not mentioned"],
      "days": [
        {"day": 1, "title": "Airport Pickup, Corbyn Cove Beach & Light and Sound Show", "description": "Arrive Port Blair, transfer to hotel. Post-lunch visit Cellular Jail & Corbyn''s Cove. Evening Light & Sound show.", "activities": [{"name": "Cellular Jail Visit"}, {"name": "Corbyn''s Cove Visit"}, {"name": "Light and Sound Show"}], "meals": [], "accommodation": "Port Blair Hotel"},
        {"day": 2, "title": "Explore Swaraj Dweep (Havelock) Island & Overnight Stay", "description": "Early cruise (8 AM) to Havelock. Arrive 9:45 AM, check into hotel. Visit Kalapathar Beach. Post-lunch visit Radhanagar Beach for sunset.", "activities": [{"name": "Cruise to Havelock"}, {"name": "Kalapathar Beach Visit"}, {"name": "Radhanagar Beach Visit"}], "meals": ["Breakfast"], "accommodation": "Havelock Resort"},
        {"day": 3, "title": "Elephant Beach Excursion: Snorkeling & Adventure", "description": "Transfer to Havelock Jetty, speedboat to Elephant Beach. Enjoy complimentary snorkeling. Optional Sea Walking available. Return to hotel by lunchtime.", "activities": [{"name": "Elephant Beach Excursion"}, {"name": "Complimentary Snorkeling"}], "meals": ["Breakfast"], "accommodation": "Havelock Resort"},
        {"day": 4, "title": "Journey to Shaheed Dweep (Neil Island)", "description": "Breakfast, check out. 10:15 AM cruise from Havelock to Neil Island. Arrive 11:15 AM, check into hotel. Visit Bharatpur Beach (water sports optional) & Laxmanpur Beach for sunset.", "activities": [{"name": "Cruise to Neil Island"}, {"name": "Bharatpur Beach Visit"}, {"name": "Laxmanpur Beach Visit"}], "meals": ["Breakfast"], "accommodation": "Neil Resort"},
        {"day": 5, "title": "Return from Neil Island & Chidiyatapu Sunset Point", "description": "Early morning (4 AM) visit Sitapur Beach for sunrise. Return for breakfast, check out. 11:30 AM cruise Neil to Port Blair. Arrive 12:40 PM, check into hotel. Post-lunch visit Chidiyatapu (Bird Sanctuary, Mini Zoo, Mundapahad Beach sunset).", "activities": [{"name": "Sitapur Beach Sunrise Visit"}, {"name": "Cruise to Port Blair"}, {"name": "Chidiyatapu Visit"}], "meals": ["Breakfast"], "accommodation": "Port Blair Hotel"},
        {"day": 6, "title": "Departure with Fond Memories", "description": "After breakfast, transfer to Port Blair airport for departure.", "activities": [{"name": "Airport Transfer"}], "meals": ["Breakfast"], "accommodation": null}
      ]
    }',
    '["Accommodation", "Private AC Cab", "Breakfast", "Sightseeing", "Cruise Tickets", "Boat Tickets", "Entry Tickets", "Snorkeling"]',
    '/images/andaman_6d_1.jpg,/images/elephant_beach.jpg,/images/sitapur_sunrise.jpg,/images/neil_bharatpur.jpg'
  );
  INSERT INTO packages (id, name, description, duration, base_price, max_people, created_by, is_active, itinerary, included_services, images) VALUES
  (5, '3 Days Port Blair, Ross & North Bay', 'A short trip focusing on Port Blair''s historical sites (Cellular Jail, Corbyn''s Cove), the scenic Ross Island ruins, North Bay''s coral reefs, and the beautiful Chidiyatapu sunset.', '3 Days / 2 Nights', 13970, 2, 1, 1,
    '{
      "highlights": ["Cellular Jail Visit", "Light & Sound Show", "Corbyn''s Cove Beach", "Ross Island", "North Bay Island", "Coral Reefs", "Chidiyatapu Sunset"],
      "inclusions": ["Airport Transfers", "Private AC Cab for sightseeing", "Accommodation (2N Port Blair)", "Breakfast", "Boat tickets (PB-Ross-North Bay-PB)", "Entry tickets (Cellular Jail, L&S Show)"],
      "exclusions": ["Flight Tickets", "Lunch & Dinner", "Water sports charges (Snorkeling etc. at North Bay)", "Personal expenses", "Anything not mentioned in inclusions"],
      "days": [
        {"day": 1, "title": "Arrival, Corbyn''s Cove Beach & Cellular Jail Light and Sound Show", "description": "Arrival at Port Blair airport, transfer to hotel. Post-lunch, visit Cellular Jail and Corbyn''s Cove Beach. Evening Light and Sound Show at Cellular Jail.", "activities": [{"name": "Cellular Jail Visit"}, {"name": "Corbyn''s Cove Beach Visit"}, {"name": "Light and Sound Show"}], "meals": [], "accommodation": "Port Blair Hotel"},
        {"day": 2, "title": "Adventure to Ross Island, North Bay Island, and Chidiyatapu Beach", "description": "Early pickup (7:00 AM) for 8:00 AM boat ride. Visit Ross Island (ruins, deer, peacocks). Proceed to North Bay Island (coral reefs, underwater world - snorkeling optional). Return to Port Blair jetty. Post-lunch, visit Chidiyatapu (Bird Sanctuary, Mini Zoo, Mundapahad Beach sunset). Return to hotel.", "activities": [{"name": "Ross Island Visit"}, {"name": "North Bay Island Visit"}, {"name": "Chidiyatapu Visit"}], "meals": ["Breakfast"], "accommodation": "Port Blair Hotel"},
        {"day": 3, "title": "Return Home with Sweet Memory", "description": "After breakfast, check out and proceed to the airport for your departure flight. Optional shopping if time permits.", "activities": [{"name": "Airport Transfer"}], "meals": ["Breakfast"], "accommodation": null}
      ]
    }',
    '["Accommodation", "Transfers", "Breakfast", "Sightseeing", "Boat Tickets", "Entry Tickets"]',
    '/images/andaman_3d_ross_1.jpg,/images/ross_island.jpg,/images/north_bay.jpg,/images/chidiyatapu_sunset.jpg'
  );
  INSERT INTO packages (id, name, description, duration, base_price, max_people, created_by, is_active, itinerary, included_services, images) VALUES
  (6, '4 Days Port Blair, Havelock, Ross & North Bay', 'Experience a mix of Andaman: Port Blair''s history, an overnight stay in Havelock exploring Radhanagar Beach, and the popular Ross & North Bay island tour, plus Chidiyatapu sunset.', '4 Days / 3 Nights', 29040, 2, 1, 1,
    '{
      "highlights": ["Cellular Jail", "Corbyn''s Cove", "Havelock Overnight Stay", "Radhanagar Beach", "Ross Island", "North Bay Island", "Chidiyatapu Sunset"],
      "inclusions": ["Private AC Cab Transfers", "Accommodation (2N Port Blair, 1N Havelock)", "Breakfast", "Cruise tickets (PB-Hav, Hav-PB)", "Boat tickets (Ross & North Bay)", "Entry tickets (Cellular Jail, L&S Show)"],
      "exclusions": ["Flight Tickets", "Lunch & Dinner", "Water sports charges", "Personal expenses", "Anything not mentioned"],
      "days": [
        {"day": 1, "title": "Discover Port Blair: History and Adventure", "description": "Airport pickup, transfer to Port Blair hotel. Afternoon visit Cellular Jail and Corbyn''s Cove Beach. Evening Light and Sound Show.", "activities": [{"name": "Cellular Jail Visit"}, {"name": "Corbyn''s Cove Visit"}, {"name": "Light and Sound Show"}], "meals": [], "accommodation": "Port Blair Hotel"},
        {"day": 2, "title": "Island Bliss: SwaraajDweep (Havelock) Overnight", "description": "Early pickup (7:00 AM) for 8:00 AM cruise to Havelock. Arrive ~9:45 AM, check into Havelock hotel. Visit Radhanagar Beach. Relax and enjoy the island. Overnight stay.", "activities": [{"name": "Cruise to Havelock"}, {"name": "Radhanagar Beach Visit"}], "meals": ["Breakfast"], "accommodation": "Havelock Resort"},
        {"day": 3, "title": "Ross, North Bay & Chidiyatapu Adventure", "description": "Morning cruise from Havelock back to Port Blair. Transfer to Port Blair hotel. Proceed for boat trip to Ross Island (ruins) and North Bay Island (corals, optional snorkeling). Return to Port Blair Jetty. Evening visit Chidiyatapu for sunset.", "activities": [{"name": "Cruise to Port Blair"}, {"name": "Ross Island Visit"}, {"name": "North Bay Island Visit"}, {"name": "Chidiyatapu Sunset Visit"}], "meals": ["Breakfast"], "accommodation": "Port Blair Hotel"},
        {"day": 4, "title": "Return Home with Sweet Memory", "description": "After breakfast, transfer to the airport for departure. Optional shopping if time permits.", "activities": [{"name": "Airport Transfer"}], "meals": ["Breakfast"], "accommodation": null}
      ]
    }',
    '["Accommodation", "Transfers", "Breakfast", "Sightseeing", "Cruise Tickets", "Boat Tickets", "Entry Tickets"]',
    '/images/andaman_4d_mix_1.jpg,/images/radhanagar_beach.jpg,/images/ross_island_ruins.jpg,/images/north_bay_snorkeling.jpg'
  );
  INSERT INTO packages (id, name, description, duration, base_price, max_people, created_by, is_active, itinerary, included_services, images) VALUES
  (7, '7 Days with Baratang', 'An extensive Andaman journey covering Port Blair, a day trip to Baratang''s Limestone Caves & Mud Volcano, 2 nights in Havelock (Radhanagar, Kalapathar, Elephant Beach), 1 night in Neil Island, and Chidiyatapu.', '7 Days / 6 Nights', 54425, 2, 1, 1,
    '{
      "highlights": ["Cellular Jail", "Corbyn''s Cove", "Baratang Day Trip", "Limestone Caves", "Mud Volcano", "Jarawa Reserve Transit", "Havelock (2N)", "Kalapathar Beach", "Radhanagar Beach", "Elephant Beach", "Neil Island (1N)", "Bharatpur Beach", "Laxmanpur Beach", "Sitapur Beach Sunrise", "Chidiyatapu Sunset"],
      "inclusions": ["Private AC Cab Transfers (incl. Baratang)", "Accommodation (3N Port Blair, 2N Havelock, 1N Neil)", "Breakfast", "Cellular Jail Entry & Light/Sound Show Tickets", "Cruise Tickets (PB-Hav, Hav-Neil, Neil-PB)", "Baratang Boat Tickets", "Elephant Beach Speedboat Ticket", "Complimentary Snorkeling at Elephant Beach"],
      "exclusions": ["Flight Tickets", "Lunch & Dinner (except Baratang if self-arranged)", "Optional Activities (Scuba, Sea Walking etc.)", "Personal Expenses", "Anything not mentioned"],
      "days": [
        {"day": 1, "title": "Airport Pickup, Corbyn Cove Beach & Light and Sound Show", "description": "Arrive Port Blair, transfer to hotel. Visit Cellular Jail & Corbyn''s Cove. Evening Light & Sound show.", "activities": [{"name": "Cellular Jail Visit"}, {"name": "Corbyn''s Cove Visit"}, {"name": "Light and Sound Show"}], "meals": [], "accommodation": "Port Blair Hotel"},
        {"day": 2, "title": "Journey to Baratang Island, Limestone Caves & Mud Volcano", "description": "4:00 AM pickup, drive through Jarawa Reserve to Baratang. Boat ride & trek to Limestone Caves. Visit Mud Volcano. Lunch self-arranged. Return to Port Blair hotel by 6:00 PM.", "activities": [{"name": "Baratang Day Trip"}, {"name": "Limestone Caves Visit"}, {"name": "Mud Volcano Visit"}], "meals": ["Breakfast"], "accommodation": "Port Blair Hotel"},
        {"day": 3, "title": "Explore Swaraj Dweep (Havelock) Island & Overnight Stay", "description": "Early cruise (8 AM) to Havelock. Check into hotel. Visit Kalapathar Beach & Radhanagar Beach (sunset).", "activities": [{"name": "Cruise to Havelock"}, {"name": "Kalapathar Beach Visit"}, {"name": "Radhanagar Beach Visit"}], "meals": ["Breakfast"], "accommodation": "Havelock Resort"},
        {"day": 4, "title": "Scuba Diving Day (Optional) and Visit Elephant Beach", "description": "Transfer to Havelock Jetty, speedboat to Elephant Beach. Complimentary snorkeling provided. Optional Scuba/Sea Walking available. Return hotel by lunch.", "activities": [{"name": "Elephant Beach Excursion"}, {"name": "Complimentary Snorkeling"}], "meals": ["Breakfast"], "accommodation": "Havelock Resort"},
        {"day": 5, "title": "Journey to Shaheed Dweep (Neil Island)", "description": "Breakfast, check out. 10:15 AM cruise Havelock to Neil. Check into hotel. Visit Bharatpur Beach & Laxmanpur Beach (sunset).", "activities": [{"name": "Cruise to Neil Island"}, {"name": "Bharatpur Beach Visit"}, {"name": "Laxmanpur Beach Visit"}], "meals": ["Breakfast"], "accommodation": "Neil Resort"},
        {"day": 6, "title": "Return from Neil Island & Chidiyatapu Sunset Point", "description": "4:00 AM visit Sitapur Beach (sunrise). Breakfast, check out. 11:30 AM cruise Neil to Port Blair. Check into hotel. Visit Chidiyatapu (sunset).", "activities": [{"name": "Sitapur Beach Sunrise Visit"}, {"name": "Cruise to Port Blair"}, {"name": "Chidiyatapu Visit"}], "meals": ["Breakfast"], "accommodation": "Port Blair Hotel"},
        {"day": 7, "title": "Departure with Fond Memories", "description": "After breakfast, transfer to Port Blair airport.", "activities": [{"name": "Airport Transfer"}], "meals": ["Breakfast"], "accommodation": null}
      ]
    }',
    '["Accommodation", "Private AC Cab", "Breakfast", "Sightseeing", "Cruise Tickets", "Boat Tickets", "Entry Tickets", "Specified Activities"]',
    '/images/andaman_7d_baratang_1.jpg,/images/baratang_limestone.jpg,/images/mud_volcano.jpg,/images/elephant_beach_snorkeling.jpg'
  );
  INSERT INTO packages (id, name, description, duration, base_price, max_people, created_by, is_active, itinerary, included_services, images) VALUES
  (8, '4 Days Havelock & Elephant Beach', 'Focus on Port Blair''s history and Havelock''s beauty. Includes an overnight stay at Havelock, visits to Kalapathar & Radhanagar beaches, an excursion to Elephant Beach, and Chidiyatapu sunset on return.', '4 Days / 3 Nights', 29370, 2, 1, 1,
    '{
      "highlights": ["Cellular Jail", "Corbyn''s Cove", "Havelock Overnight", "Kalapathar Beach", "Radhanagar Beach", "Elephant Beach Excursion", "Chidiyatapu Sunset"],
      "inclusions": ["Private AC Cab Transfers", "Accommodation (2N Port Blair, 1N Havelock)", "Breakfast", "Cruise tickets (PB-Hav, Hav-PB)", "Boat ticket to Elephant Beach", "Entry tickets (Cellular Jail, L&S Show)"],
      "exclusions": ["Flight Tickets", "Lunch & Dinner", "Water sports charges (Snorkeling, Sea Walking etc. at Elephant)", "Personal expenses", "Anything not mentioned"],
      "days": [
        {"day": 1, "title": "Discover Port Blair: History and Adventure", "description": "Airport pickup, check-in Port Blair hotel. Afternoon visit Cellular Jail & Corbyn''s Cove Beach. Evening Light and Sound Show.", "activities": [{"name": "Cellular Jail Visit"}, {"name": "Corbyn''s Cove Visit"}, {"name": "Light and Sound Show"}], "meals": [], "accommodation": "Port Blair Hotel"},
        {"day": 2, "title": "A Day of Island Bliss: Explore SwaraajDweep (Havelock)", "description": "Early cruise (8 AM) to Havelock. Arrive 9:45 AM, check into Havelock hotel. Visit Kalapathar Beach & Radhanagar Beach (sunset). Overnight Havelock.", "activities": [{"name": "Cruise to Havelock"}, {"name": "Kalapathar Beach Visit"}, {"name": "Radhanagar Beach Visit"}], "meals": ["Breakfast"], "accommodation": "Havelock Resort"},
        {"day": 3, "title": "Elephant Beach & Chidiyatapu", "description": "Early breakfast, 7:45 AM speedboat from Havelock Jetty to Elephant Beach (snorkeling/sea walking optional). Return jetty for lunch. Afternoon cruise Havelock to Port Blair. Check into PB hotel. Visit Chidiyatapu (Bird sanctuary, Mini Zoo, Mundapahad Beach sunset).", "activities": [{"name": "Elephant Beach Visit"}, {"name": "Cruise to Port Blair"}, {"name": "Chidiyatapu Visit"}], "meals": ["Breakfast"], "accommodation": "Port Blair Hotel"},
        {"day": 4, "title": "Return Home with Sweet Memory", "description": "After breakfast, transfer to the airport for departure.", "activities": [{"name": "Airport Transfer"}], "meals": ["Breakfast"], "accommodation": null}
      ]
    }',
    '["Accommodation", "Transfers", "Breakfast", "Sightseeing", "Cruise Tickets", "Boat Tickets", "Entry Tickets"]',
    '/images/andaman_4d_elephant_1.jpg,/images/kalapathar_beach.jpg,/images/elephant_beach_corals.jpg,/images/mundapahad.jpg'
  );
  INSERT INTO packages (id, name, description, duration, base_price, max_people, created_by, is_active, itinerary, included_services, images) VALUES
  (9, '4 Days Neil Island Focus', 'A delightful trip covering Port Blair history, Havelock''s Radhanagar & Kalapathar, and an overnight stay in Neil Island exploring Bharatpur, Sitapur, and Laxmanpur beaches.', '4 Days / 3 Nights', 30030, 2, 1, 1,
    '{
      "highlights": ["Cellular Jail", "Corbyn''s Cove", "Havelock Island", "Kalapathar Beach", "Radhanagar Beach", "Neil Island Overnight", "Bharatpur Beach", "Sitapur Beach", "Laxmanpur Beach"],
      "inclusions": ["Private AC Cab Transfers", "Accommodation (1N Port Blair, 1N Havelock, 1N Neil)", "Breakfast", "Cruise tickets (PB-Hav, Hav-Neil, Neil-PB)", "Entry tickets (Cellular Jail, L&S Show)"],
      "exclusions": ["Flight Tickets", "Lunch & Dinner", "Water sports charges", "Personal expenses", "Anything not mentioned"],
      "days": [
        {"day": 1, "title": "Discover Port Blair: History and Adventure", "description": "Airport pickup, check-in Port Blair hotel. Afternoon visit Cellular Jail & Corbyn''s Cove Beach. Evening Light and Sound Show.", "activities": [{"name": "Cellular Jail Visit"}, {"name": "Corbyn''s Cove Visit"}, {"name": "Light and Sound Show"}], "meals": [], "accommodation": "Port Blair Hotel"},
        {"day": 2, "title": "A Day of Island Bliss: Explore SwaraajDweep (Havelock)", "description": "Early cruise (8 AM) to Havelock. Arrive 9:45 AM, check into Havelock hotel. Visit Kalapathar Beach & Radhanagar Beach (sunset). Overnight Havelock.", "activities": [{"name": "Cruise to Havelock"}, {"name": "Kalapathar Beach Visit"}, {"name": "Radhanagar Beach Visit"}], "meals": ["Breakfast"], "accommodation": "Havelock Resort"},
        {"day": 3, "title": "Island Adventures: Neil Island Overnight", "description": "Morning ferry from Havelock Jetty to Neil Island. Check into Neil hotel. Explore Bharatpur Beach (swimming/snorkeling optional), Sitapur Beach, and Laxmanpur Beach (sunset). Overnight Neil.", "activities": [{"name": "Cruise to Neil Island"}, {"name": "Bharatpur Beach Visit"}, {"name": "Sitapur Beach Visit"}, {"name": "Laxmanpur Beach Visit"}], "meals": ["Breakfast"], "accommodation": "Neil Resort"},
        {"day": 4, "title": "Return Home via Port Blair", "description": "Breakfast in Neil. Take ferry transfer from Neil Island to Port Blair. Transfer to the airport for departure.", "activities": [{"name": "Cruise to Port Blair"}, {"name": "Airport Transfer"}], "meals": ["Breakfast"], "accommodation": null}
      ]
    }',
    '["Accommodation", "Transfers", "Breakfast", "Sightseeing", "Cruise Tickets", "Entry Tickets"]',
    '/images/andaman_4d_neil_focus_1.jpg,/images/neil_bharatpur_beach.jpg,/images/sitapur_beach.jpg,/images/laxmanpur_beach_sunset.jpg'
  );
  INSERT INTO packages (id, name, description, duration, base_price, max_people, created_by, is_active, itinerary, included_services, images) VALUES
  (10, '4 Days Havelock Special', 'A relaxed trip focusing on Port Blair''s highlights and a two-night stay in Havelock to enjoy Kalapathar and Radhanagar beaches at leisure.', '4 Days / 3 Nights', 29370, 2, 1, 1,
    '{
      "highlights": ["Cellular Jail", "Corbyn''s Cove", "Havelock (2N Stay)", "Kalapathar Beach", "Radhanagar Beach", "Leisure Time"],
      "inclusions": ["Private AC Cab Transfers (PB Sightseeing, Airport/Jetty)", "Accommodation (1N Port Blair, 2N Havelock)", "Breakfast", "Cruise tickets (PB-Hav, Hav-PB)", "Entry tickets (Cellular Jail, L&S Show)"],
      "exclusions": ["Flight Tickets", "Lunch & Dinner", "Water sports charges", "Optional Activities/Transfers in Havelock on Day 3", "Personal expenses", "Anything not mentioned"],
      "days": [
        {"day": 1, "title": "Discover Port Blair: History and Adventure", "description": "Airport pickup, check-in Port Blair hotel. Afternoon visit Cellular Jail & Corbyn''s Cove Beach. Evening Light and Sound Show.", "activities": [{"name": "Cellular Jail Visit"}, {"name": "Corbyn''s Cove Visit"}, {"name": "Light and Sound Show"}], "meals": [], "accommodation": "Port Blair Hotel"},
        {"day": 2, "title": "A Day of Island Bliss: Explore SwaraajDweep (Havelock)", "description": "Early cruise (8 AM) to Havelock. Arrive 9:45 AM, check into Havelock hotel. Visit Kalapathar Beach & Radhanagar Beach (sunset). Overnight Havelock.", "activities": [{"name": "Cruise to Havelock"}, {"name": "Kalapathar Beach Visit"}, {"name": "Radhanagar Beach Visit"}], "meals": ["Breakfast"], "accommodation": "Havelock Resort"},
        {"day": 3, "title": "Havelock Leisure / Optional Activities", "description": "Day at leisure in Havelock. Explore local surroundings, relax on the beach, or opt for activities like Elephant Beach excursion (additional cost).", "activities": [{"name": "Leisure Day"}], "meals": ["Breakfast"], "accommodation": "Havelock Resort"},
        {"day": 4, "title": "Return Home with Sweet Memory", "description": "After breakfast, take the cruise from Havelock back to Port Blair. Transfer to the airport for departure.", "activities": [{"name": "Cruise to Port Blair"}, {"name": "Airport Transfer"}], "meals": ["Breakfast"], "accommodation": null}
      ]
    }',
    '["Accommodation", "Transfers", "Breakfast", "Sightseeing (PB Only)", "Cruise Tickets", "Entry Tickets"]',
    '/images/andaman_4d_havelock_1.jpg,/images/havelock_kalapathar.jpg,/images/radhanagar_sunset.jpg,/images/port_blair_aerial.jpg'
  );


  INSERT INTO islands (id, name, description, permit_required, images) VALUES
  (5, 'Rangat', 'A tranquil town in Middle Andaman offering India’s longest mangrove boardwalk at Dhani Nallah, eco-parks like Amkunj Beach, and secluded turtle-nesting beaches.', 0, '/images/rangat/hero.webp'),
  (6, 'Mayabundar', 'The administrative hub of North & Middle Andaman, notable for its cultural mix of Karen and Bengali communities, turtle-nesting Karmatang Beach, and nearby mangrove creeks.', 0, '/images/mayabundar/hero.webp'),
  (7, 'Diglipur', 'The northern frontier town famed for the twin-islands of Ross & Smith, Saddle Peak National Park treks, limestone caves, mud volcanoes, and seasonal turtle nesting.', 0, '/images/diglipur/hero.webp'),
  (8, 'Little Andaman', 'A remote southern island known for Butler Bay surf breaks, pristine beaches, White Surf and Whisper Wave waterfalls, and lush rainforest trails.', 0, '/images/little-andaman/hero.webp');
 

INSERT INTO bookings (user_id, package_id, total_people, start_date, end_date, status, total_amount, payment_status)
VALUES (2, 1, 2, '2025-07-10', '2025-07-15', 'confirmed', 30000, 'paid');
-- Re-enable FK constraints if they were disabled
PRAGMA foreign_keys=ON;

-- End of seed data