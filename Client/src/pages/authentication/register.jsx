import { useContext , useState} from "react";
import { informationContext } from "../../App";
import { NavLink } from "react-router";
import { validationError } from "../../utils/utils";

const Register = () => {
    
  const { t } = useContext(informationContext);

  const [error, setError] = useState(true);


  return (
    <div className="flex justify-center items-center w-full py-[30px] max-md:px-[16px]">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            {t("create_account")}
          </h1>
          <form className="space-y-4 md:space-y-6" action="">
            {/* First Name */}
            <div>
              <label htmlFor="firstname" className={`${error == false ? validationError.labelSuccess : validationError.labelError} block mb-2 text-sm font-medium`}>
                {t("first_name")}
              </label>
              <input
                 type="text"
                 name="firstname"
                 id="firstname"
                 placeholder={t("first_name_placeholder")}
                 className={`${error == false  ? validationError.inputSuccess : validationError.inputError} text-sm rounded-lg block w-full p-2.5`}
              />
              {error == true ? (<p className={validationError.messageError}>Oh, snapp! Some error message.</p>) : null}


            </div>
            {/* Last Name */}
            <div>
              <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900">
                {t("last_name")}
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder={t("last_name_placeholder")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            {/* Age */}
            <div>
              <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">
                {t("age")}
              </label>
              <input
                type="number"
                name="age"
                id="age"
                placeholder={t("age_placeholder")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                {t("email")}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder={t("email_placeholder")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                {t("password")}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {t("create_account")}
            </button>
            {/* Login Redirect */}
            <p className="text-sm font-light text-gray-500">
              {t("already_have_account")}{" "}
              <NavLink to="/Login" className="font-medium text-primary-600 hover:underline">
                {t("login_here")}
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
