import { NextResponse } from "next/server";

type MapboxFeature = {
  id?: string;
  geometry?: {
    coordinates?: [number, number];
  };
  properties?: {
    mapbox_id?: string;
    name?: string;
    name_preferred?: string;
    full_address?: string;
    place_formatted?: string;
    feature_type?: string;
    context?: {
      country?: { name?: string; country_code_alpha_3?: string };
      region?: { name?: string; region_code?: string };
      place?: { name?: string };
      locality?: { name?: string };
    };
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();
  const token = process.env.MAPBOX_ACCESS_TOKEN;

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  if (!token) {
    return NextResponse.json(
      {
        results: [],
        message:
          "Add MAPBOX_ACCESS_TOKEN to enable global city and town autocomplete.",
      },
      { status: 503 },
    );
  }

  const mapboxUrl = new URL("https://api.mapbox.com/search/geocode/v6/forward");
  mapboxUrl.searchParams.set("q", query);
  mapboxUrl.searchParams.set("access_token", token);
  mapboxUrl.searchParams.set("types", "place,locality");
  mapboxUrl.searchParams.set("autocomplete", "true");
  mapboxUrl.searchParams.set("limit", "6");

  const response = await fetch(mapboxUrl, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    return NextResponse.json(
      { results: [], message: "Location search is unavailable right now." },
      { status: 502 },
    );
  }

  const data = (await response.json()) as { features?: MapboxFeature[] };
  const results =
    data.features?.map((feature) => {
      const properties = feature.properties;
      const coordinates = feature.geometry?.coordinates;
      const context = properties?.context;
      const city =
        properties?.name_preferred ||
        properties?.name ||
        context?.place?.name ||
        context?.locality?.name ||
        "";
      const region = context?.region?.name || "";
      const country = context?.country?.name || "";
      const label = [city, region, country].filter(Boolean).join(", ");

      return {
        id: properties?.mapbox_id || feature.id || label,
        label: label || properties?.full_address || city,
        city,
        region,
        country,
        countryCode: context?.country?.country_code_alpha_3 || "",
        longitude: coordinates?.[0] ?? null,
        latitude: coordinates?.[1] ?? null,
        featureType: properties?.feature_type || "",
      };
    }) || [];

  return NextResponse.json({ results });
}
