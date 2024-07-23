import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/dateTimePicker";
import CalenderComponent from "@/elements/CalenderComponent";
import ChartComponent from "@/elements/ChartComponent";
import PieComponent from "@/elements/PieComponent";
import Image from "next/image";

export default function Home() {
   return (
      <>
         <div className="container py-10 lg:py-20">
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
               <div>
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                     BeingInGym: Your ultimate fitness partner
                  </h1>
                  <p className="mt-3 text-xl text-muted-foreground">
                     We provide you with the best fitness experience with our
                     top-notch equipment and professional trainers.
                  </p>
                  <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                     <Button size="lg">Get started</Button>
                     <Button size="lg" variant="outline">
                        Learn more
                     </Button>
                  </div>
                  <div className="mt-6 lg:mt-10 grid grid-cols-2 gap-x-5">
                     <RatingDisplay rating={4.6} reviews={12000} />
                     <RatingDisplay rating={4.8} reviews={5000} />
                  </div>
               </div>
               <div className="relative ms-4">
                  <Image
                     src="/hero.jpeg"
                     alt="hero"
                     className="w-full rounded-md shadow-2xl max-h-80 object-cover"
                     width={500}
                     height={200}
                     objectFit="contain"
                  />
               </div>
            </div>

            <div className="bg-white py-10 sm:py-20">
               <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                     Trusted by the world’s most innovative teams
                  </h2>
                  <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                     {[
                        "transistor",
                        "reform",
                        "tuple",
                        "savvycal",
                        "statamic",
                     ].map((company) => (
                        <div
                           key={company}
                           className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        >
                           <Image
                              src={`https://tailwindui.com/img/logos/158x48/${company}-logo-gray-900.svg`}
                              alt={company}
                              width={158}
                              height={48}
                           />
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="bg-white py-10 sm:py-20">
               <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <StatsDisplay />
               </div>
            </div>
            <div className="bg-white py-10 sm:py-20">
               <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900">
                     Fitness Insights
                  </h2>
                  <p className="mt-3 text-center text-lg text-muted-foreground">
                     Get detailed insights about your fitness journey with our
                     interactive charts and data visualizations.
                  </p>
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                           Monthly Progress
                        </h3>
                        <p className="text-gray-600 mt-2">
                           Track your monthly progress with our detailed charts.
                        </p>
                        <ChartComponent />
                     </div>
                     <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                           Exercise Distribution
                        </h3>
                        <p className="text-gray-600 mt-2">
                           Understand the distribution of different exercises
                           you perform.
                        </p>
                        <PieComponent />
                     </div>
                     <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                           Monthly Progress
                        </h3>
                        <p className="text-gray-600 mt-2">
                           Track your monthly progress with our detailed charts.
                        </p>
                        {/* <CalenderComponent /> */}
                        <DateTimePicker />
                     </div>
                     <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                           Exercise Distribution
                        </h3>
                        <p className="text-gray-600 mt-2">
                           Understand the distribution of different exercises
                           you perform.
                        </p>
                        <PieComponent />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

const RatingDisplay = ({
   rating,
   reviews,
}: {
   rating: number;
   reviews: number;
}) => {
   const stars = [];
   const fullStars = Math.floor(rating);
   const halfStar = rating - fullStars >= 0.5;

   for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} />);
   }
   if (halfStar) {
      stars.push(<HalfStar key="half" />);
   }

   return (
      <div className="py-5">
         <div className="flex space-x-1">{stars}</div>
         <p className="mt-3 text-sm">
            <span className="font-bold">{rating}</span> /5 - from {reviews}{" "}
            reviews
         </p>
      </div>
   );
};

const Star = () => (
   <svg
      className="h-4 w-4"
      width={51}
      height={51}
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path
         d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
         fill="currentColor"
      />
   </svg>
);

const HalfStar = () => (
   <svg
      className="h-4 w-4"
      width={51}
      height={51}
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path
         d="M49.6867 20.0305C50.2889 19.3946 49.9878 18.1228 49.0846 18.1228L33.7306 15.8972C33.4296 15.8972 33.1285 15.8972 32.8275 15.2613L25.9032 0.317944C25.6021 0 25.3011 0 25 0V42.6046C25 42.6046 25.3011 42.6046 25.6021 42.6046L39.7518 49.9173C40.3539 50.2352 41.5581 49.5994 41.2571 48.6455L38.5476 32.4303C38.5476 32.1124 38.5476 31.7944 38.8486 31.4765L49.6867 20.0305Z"
         fill="transparent"
      />
      <path
         d="M0.313299 20.0305C-0.288914 19.3946 0.0122427 18.1228 0.915411 18.1228L16.2694 15.8972C16.5704 15.8972 16.8715 15.8972 17.1725 15.2613L24.0968 0.317944C24.3979 0 24.6989 0 25 0V42.6046C25 42.6046 24.6989 42.6046 24.3979 42.6046L10.2482 49.9173C9.64609 50.2352 8.44187 49.5994 8.74292 48.6455L11.4524 32.4303C11.4524 32.1124 11.4524 31.7944 11.1514 31.4765L0.313299 20.0305Z"
         fill="currentColor"
      />
   </svg>
);

const StatsDisplay = () => (
   <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
      <StatItem label="Transactions every 24 hours" value="44 million" />
      <StatItem label="Assets under holding" value="$119 trillion" />
      <StatItem label="New users annually" value="46,000" />
   </dl>
);

const StatItem = ({ label, value }: { label: string; value: string }) => (
   <div className="mx-auto flex max-w-xs flex-col gap-y-4">
      <dt className="text-base leading-7 text-gray-600">{label}</dt>
      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
         {value}
      </dd>
   </div>
);
