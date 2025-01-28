import { useContext } from "react";
import { informationContext } from "../../App";
import { NavLink } from "react-router";



export default function Hero() {
  const { t } = useContext(informationContext);
  return (
    <div
      className="mt-[62px] w-full h-[80vh] background bg-cover bg-center text-white flex items-center justify-center"
    >
      <div className="text-center max-w-4xl px-6 rounded-lg py-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl mb-6">
         {t('hero.description')}
        </p>
        <div className="flex max-md:flex-col  justify-center gap-4">
           {/* create the system her the colors #155dfc #ffffff #d9dbdc */}
        </div>
      </div>
    </div>
  );
}
