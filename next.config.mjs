/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      new URL(
        "https://mxnjjknntzsurvnaywbj.supabase.co/storage/v1/object/public/cabin-images/**"
      ),
    ],
  },
  //output: "export",
};

export default nextConfig;
