import { CustomFlowbiteTheme } from 'flowbite-react';

//for jub difinition on the categories
export const customTheme: CustomFlowbiteTheme['badge'] = {
    root:{
        color:{
            success:"bg-appGreen text-white font-thin"
        }
    }
  };

  export const TimeLimeIcon_Theme: CustomFlowbiteTheme['timeline'] = {
    item:{
        point:{
            marker:{
                icon:{
                    "base": "h-3 w-3 text-appGreen dark:text-appGreen",
                    wrapper: "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-black ring-8 ring-white dark:bg-black dark:ring-gray-900"
                }
            }
        }
    }
  };

  //success or submit button
  export const customsubmitTheme: CustomFlowbiteTheme['button'] = {
    color:{
        appsuccess:"text-white bg-appGreen border border-transparent enabled:hover:bg-appGreen focus:ring-4 focus:ring-green-300 dark:bg-appGreen dark:enabled:hover:bg-black dark:focus:ring-appGreen",
        success:"text-white bg-appGreen border border-transparent enabled:hover:bg-appGreen focus:ring-4 focus:ring-green-300 dark:bg-appGreen dark:enabled:hover:bg-black dark:focus:ring-appGreen"
    }
  };

  //Checkbox  theme
  export const customCheckboxTheme: CustomFlowbiteTheme['checkbox'] = {
    root:{
        color:{
            success: "focus:ring-appGreen dark:ring-appGreen dark:focus:ring-appGreen text-appGreen"
        }
    }
  };