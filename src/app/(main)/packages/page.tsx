// Path: src/app/(main)/packages/[id]/page.tsx
'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Users, Check, Info, ArrowRight, Loader2, AlertTriangle, Camera, ChevronLeft, ChevronRight, ShieldCheck, Star, Package as PackageIcon } from 'lucide-react'; // Added PackageIcon
import { useFetch } from '@/hooks/useFetch';

// --- Interfaces ---
interface ItineraryDay {
  day_number: number;
  title: string;
  description: string;
}

interface PackageCategoryDisplay {
  id: number;
  category_name: string;
  price: number;
  hotel_details: string | null;
  category_description: string | null;
  max_pax_included_in_price: number | null;
  images: string[];
}

interface PackageData {
  id: number;
  name: string;
  description: string | null;
  duration: string;
  base_price: number;
  max_people: number | null;
  itinerary: ItineraryDay[];
  included_services: string | null; // Will be parsed if string, or used as is if already array from a different source
  images: string[]; // Parsed main package images
  cancellation_policy: string | null;
  categories: PackageCategoryDisplay[];
  bestTimeToVisit?: string;
  howToReach?: string;
  created_at?: string;
  updated_at?: string;
}

interface GetPackageApiResponse {
  success: boolean;
  data: PackageData | null;
  message?: string;
}
// --- End Interfaces ---
