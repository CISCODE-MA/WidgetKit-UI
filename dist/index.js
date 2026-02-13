import React4, { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo } from 'react';
import { useLocation, NavLink, Link as Link$1 } from 'react-router';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useT } from '@ciscode/ui-translate-core';
import { Link } from 'react-router-dom';
import { ZodError } from 'zod';
import Select from 'react-select';
import ReactDOM from 'react-dom';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
function ClickOutside({ children, exceptionRef, onClick, className }) {
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickListener = (event) => {
      let clickedInside = false;
      if (exceptionRef) {
        clickedInside = wrapperRef.current && wrapperRef.current.contains(event.target) || exceptionRef.current && exceptionRef.current === event.target || exceptionRef.current && exceptionRef.current.contains(event.target);
      } else {
        clickedInside = wrapperRef.current && wrapperRef.current.contains(event.target);
      }
      if (!clickedInside) onClick();
    };
    document.addEventListener("mousedown", handleClickListener);
    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [exceptionRef, onClick]);
  return /* @__PURE__ */ jsx("div", { ref: wrapperRef, className: `${className || ""}`, children });
}
var ClickOutside_default = ClickOutside;
var DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const t = useT("templateFe");
  const messages = [
    { id: 1, user: "Mariya Desoja", text: "I like your confidence \u{1F4AA}", time: "2min ago" },
    { id: 2, user: "Robert Jhon", text: "Can you share your offer?", time: "10min ago" },
    { id: 3, user: "Henry Dholi", text: "I came across your profile and...", time: "1day ago" },
    { id: 4, user: "Cody Fisher", text: "I\u2019m waiting for your response!", time: "5days ago" },
    { id: 5, user: "Mariya Desoja", text: "I like your confidence \u{1F4AA}", time: "2min ago" }
  ];
  return /* @__PURE__ */ jsx(ClickOutside_default, { onClick: () => setDropdownOpen(false), className: "relative", children: /* @__PURE__ */ jsxs("li", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      Link$1,
      {
        onClick: () => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        },
        className: "relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white",
        to: "#",
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `absolute -top-0.5 ltr:-right-0.5 rtl:-left-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 ${notifying === false ? "hidden" : "inline"}`,
              children: /* @__PURE__ */ jsx("span", { className: "absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75" })
            }
          ),
          /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "fill-current duration-300 ease-in-out",
              width: "18",
              height: "18",
              viewBox: "0 0 18 18",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M10.9688 1.57495H7.03135C3.43135 1.57495 0.506348 4.41558 0.506348 7.90308C0.506348 11.3906 2.75635 13.8375 8.26885 16.3125C8.40947 16.3687 8.52197 16.3968 8.6626 16.3968C8.85947 16.3968 9.02822 16.3406 9.19697 16.2281C9.47822 16.0593 9.64697 15.75 9.64697 15.4125V14.2031H10.9688C14.5688 14.2031 17.522 11.3625 17.522 7.87495C17.522 4.38745 14.5688 1.57495 10.9688 1.57495ZM10.9688 12.9937H9.3376C8.80322 12.9937 8.35322 13.4437 8.35322 13.9781V15.0187C3.6001 12.825 1.74385 10.8 1.74385 7.9312C1.74385 5.14683 4.10635 2.8687 7.03135 2.8687H10.9688C13.8657 2.8687 16.2563 5.14683 16.2563 7.9312C16.2563 10.7156 13.8657 12.9937 10.9688 12.9937Z",
                    fill: ""
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M5.42812 7.28442C5.0625 7.28442 4.78125 7.56567 4.78125 7.9313C4.78125 8.29692 5.0625 8.57817 5.42812 8.57817C5.79375 8.57817 6.075 8.29692 6.075 7.9313C6.075 7.56567 5.79375 7.28442 5.42812 7.28442Z",
                    fill: ""
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M9.00015 7.28442C8.63452 7.28442 8.35327 7.56567 8.35327 7.9313C8.35327 8.29692 8.63452 8.57817 9.00015 8.57817C9.33765 8.57817 9.64702 8.29692 9.64702 7.9313C9.64702 7.56567 9.33765 7.28442 9.00015 7.28442Z",
                    fill: ""
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M12.5719 7.28442C12.2063 7.28442 11.925 7.56567 11.925 7.9313C11.925 8.29692 12.2063 8.57817 12.5719 8.57817C12.9375 8.57817 13.2188 8.29692 13.2188 7.9313C13.2188 7.56567 12.9094 7.28442 12.5719 7.28442Z",
                    fill: ""
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    dropdownOpen && /* @__PURE__ */ jsxs("div", { className: "absolute mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ltr:-right-16 rtl:-left-16 sm:ltr:right-0 sm:rtl:left-0 sm:w-80", children: [
      /* @__PURE__ */ jsx("div", { className: "px-4.5 py-3", children: /* @__PURE__ */ jsx("h5", { className: "text-sm font-medium text-bodydark2", children: t("dropdown.messages") }) }),
      /* @__PURE__ */ jsx("ul", { className: "flex h-auto flex-col overflow-y-auto", children: messages.map(({ id, user, text, time }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        Link$1,
        {
          className: "flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4",
          to: "/messages",
          children: [
            /* @__PURE__ */ jsx("div", { className: "h-12.5 w-12.5 rounded-full", children: /* @__PURE__ */ jsx("img", { src: "UserOne", alt: user }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h6", { className: "text-sm font-medium text-black dark:text-white", children: user }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: text }),
              /* @__PURE__ */ jsx("p", { className: "text-xs", children: time })
            ] })
          ]
        }
      ) }, id)) })
    ] })
  ] }) });
};
var DropdownMessage_default = DropdownMessage;
var DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const t = useT("templateFe");
  const notifications = [
    {
      id: 1,
      title: "Edit your information in a swipe",
      description: "Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      time: "12 May, 2025"
    },
    {
      id: 2,
      title: "It is a long established fact",
      description: "that a reader will be distracted by the readable.",
      time: "24 Feb, 2025"
    },
    {
      id: 3,
      title: "There are many variations",
      description: "of passages of Lorem Ipsum available, but the majority have suffered",
      time: "04 Jan, 2025"
    },
    {
      id: 4,
      title: "There are many variations",
      description: "of passages of Lorem Ipsum available, but the majority have suffered",
      time: "01 Dec, 2024"
    }
  ];
  return /* @__PURE__ */ jsx(ClickOutside_default, { onClick: () => setDropdownOpen(false), className: "relative", children: /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsxs(
      Link$1,
      {
        onClick: () => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        },
        to: "#",
        className: "relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white",
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `absolute -top-0.5 ltr:-right-0.5 rtl:-left-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 ${notifying === false ? "hidden" : "inline"}`,
              children: /* @__PURE__ */ jsx("span", { className: "absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75" })
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: "fill-current duration-300 ease-in-out",
              width: "18",
              height: "18",
              viewBox: "0 0 18 18",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z",
                  fill: ""
                }
              )
            }
          )
        ]
      }
    ),
    dropdownOpen && /* @__PURE__ */ jsxs("div", { className: "absolute mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ltr:-right-27 rtl:-left-27 sm:ltr:right-0 sm:rtl:left-0 sm:w-80", children: [
      /* @__PURE__ */ jsx("div", { className: "px-4.5 py-3", children: /* @__PURE__ */ jsx("h5", { className: "text-sm font-medium text-bodydark2", children: t("dropdown.notifications") }) }),
      /* @__PURE__ */ jsx("ul", { className: "flex h-auto flex-col overflow-y-auto", children: notifications.map(({ id, title, description, time }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        Link$1,
        {
          className: "flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4",
          to: "#",
          children: [
            /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-black dark:text-white", children: title }),
              " ",
              description
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs", children: time })
          ]
        }
      ) }, id)) })
    ] })
  ] }) });
};
var DropdownNotification_default = DropdownNotification;
var DropdownUser = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const t = useT("templateFe");
  const role = "superAdmin";
  const translatedRole = t(`roles.${role}`, { defaultValue: role });
  console.log("DROPDOWN RENDER onLogout =", onLogout);
  return /* @__PURE__ */ jsxs(ClickOutside_default, { onClick: () => setDropdownOpen(false), className: "relative", children: [
    /* @__PURE__ */ jsxs(
      Link$1,
      {
        onClick: () => setDropdownOpen(!dropdownOpen),
        className: "flex items-center gap-4",
        to: "#",
        children: [
          /* @__PURE__ */ jsxs("span", { className: "hidden lg:block ltr:text-right rtl:text-left", children: [
            /* @__PURE__ */ jsx("span", { className: "block text-sm font-medium text-black dark:text-white", children: "Thomas Anree" }),
            /* @__PURE__ */ jsx("span", { className: "block text-xs", children: translatedRole })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "h-12 w-12", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "rounded-full",
              src: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1746791582~exp=1746795182~hmac=309f4f17836c810c90c28cdb6f2e1503a0298aaf7d37c748cae051e32a33a927&w=740",
              alt: "User"
            }
          ) }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: "hidden fill-current sm:block",
              width: "12",
              height: "8",
              viewBox: "0 0 12 8",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  d: "M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z",
                  fill: ""
                }
              )
            }
          )
        ]
      }
    ),
    dropdownOpen && /* @__PURE__ */ jsxs("div", { className: "absolute mt-4 ltr:right-0 rtl:left-0 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark", children: [
      /* @__PURE__ */ jsxs("ul", { className: "flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          Link$1,
          {
            to: "/profile",
            className: "flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base",
            onClick: () => setDropdownOpen(false),
            children: [
              /* @__PURE__ */ jsx("span", { className: "w-[22px]" }),
              t("dropdown.profile")
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          Link$1,
          {
            to: "#",
            className: "flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base",
            children: [
              /* @__PURE__ */ jsx("span", { className: "w-[22px]" }),
              t("dropdown.contacts")
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          Link$1,
          {
            to: "/settings",
            className: "flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base",
            onClick: () => setDropdownOpen(false),
            children: [
              /* @__PURE__ */ jsx("span", { className: "w-[22px]" }),
              t("dropdown.settings")
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            console.log("DROPDOWN LOGOUT CLICKED, onLogout =", onLogout);
            setDropdownOpen(false);
            onLogout == null ? void 0 : onLogout();
          },
          className: "flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base",
          children: [
            /* @__PURE__ */ jsx("span", { className: "w-[22px]" }),
            t("dropdown.logout")
          ]
        }
      )
    ] })
  ] });
};
var DropdownUser_default = DropdownUser;
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);
  return [storedValue, setStoredValue];
}
var useLocalStorage_default = useLocalStorage;

// src/hooks/useColorMode.tsx
var useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage_default("color-theme", "light");
  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;
    if (colorMode === "dark") {
      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }
  }, [colorMode]);
  return [colorMode, setColorMode];
};
var useColorMode_default = useColorMode;
var DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode_default();
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
    "label",
    {
      className: `relative m-0 block h-7.5 w-14 rounded-full ${colorMode === "dark" ? "bg-primary" : "bg-stroke"}`,
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            onChange: () => typeof setColorMode === "function" && setColorMode(colorMode === "light" ? "dark" : "light"),
            className: "absolute inset-0 cursor-pointer opacity-0"
          }
        ),
        /* @__PURE__ */ jsxs(
          "span",
          {
            className: `absolute top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ltr:left-[3px] rtl:right-[3px] ${colorMode === "dark" ? "ltr:!right-[3px] rtl:!left-[3px] ltr:!translate-x-full rtl:!-translate-x-full" : ""}`,
            children: [
              /* @__PURE__ */ jsx("span", { className: "dark:hidden", children: /* @__PURE__ */ jsxs(
                "svg",
                {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 16 16",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: [
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M7.99992 12.6666C10.5772 12.6666 12.6666 10.5772 12.6666 7.99992C12.6666 5.42259 10.5772 3.33325 7.99992 3.33325C5.42259 3.33325 3.33325 5.42259 3.33325 7.99992C3.33325 10.5772 5.42259 12.6666 7.99992 12.6666Z",
                        fill: "#969AA1"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M8.00008 15.3067C7.63341 15.3067 7.33342 15.0334 7.33342 14.6667V14.6134C7.33342 14.2467 7.63341 13.9467 8.00008 13.9467C8.36675 13.9467 8.66675 14.2467 8.66675 14.6134C8.66675 14.9801 8.36675 15.3067 8.00008 15.3067ZM12.7601 13.4267C12.5867 13.4267 12.4201 13.3601 12.2867 13.2334L12.2001 13.1467C11.9401 12.8867 11.9401 12.4667 12.2001 12.2067C12.4601 11.9467 12.8801 11.9467 13.1401 12.2067L13.2267 12.2934C13.4867 12.5534 13.4867 12.9734 13.2267 13.2334C13.1001 13.3601 12.9334 13.4267 12.7601 13.4267ZM3.24008 13.4267C3.06675 13.4267 2.90008 13.3601 2.76675 13.2334C2.50675 12.9734 2.50675 12.5534 2.76675 12.2934L2.85342 12.2067C3.11342 11.9467 3.53341 11.9467 3.79341 12.2067C4.05341 12.4667 4.05341 12.8867 3.79341 13.1467L3.70675 13.2334C3.58008 13.3601 3.40675 13.4267 3.24008 13.4267ZM14.6667 8.66675H14.6134C14.2467 8.66675 13.9467 8.36675 13.9467 8.00008C13.9467 7.63341 14.2467 7.33342 14.6134 7.33342C14.9801 7.33342 15.3067 7.63341 15.3067 8.00008C15.3067 8.36675 15.0334 8.66675 14.6667 8.66675ZM1.38675 8.66675H1.33341C0.966748 8.66675 0.666748 8.36675 0.666748 8.00008C0.666748 7.63341 0.966748 7.33342 1.33341 7.33342C1.70008 7.33342 2.02675 7.63341 2.02675 8.00008C2.02675 8.36675 1.75341 8.66675 1.38675 8.66675ZM12.6734 3.99341C12.5001 3.99341 12.3334 3.92675 12.2001 3.80008C11.9401 3.54008 11.9401 3.12008 12.2001 2.86008L12.2867 2.77341C12.5467 2.51341 12.9667 2.51341 13.2267 2.77341C13.4867 3.03341 13.4867 3.45341 13.2267 3.71341L13.1401 3.80008C13.0134 3.92675 12.8467 3.99341 12.6734 3.99341ZM3.32675 3.99341C3.15341 3.99341 2.98675 3.92675 2.85342 3.80008L2.76675 3.70675C2.50675 3.44675 2.50675 3.02675 2.76675 2.76675C3.02675 2.50675 3.44675 2.50675 3.70675 2.76675L3.79341 2.85342C4.05341 3.11342 4.05341 3.53341 3.79341 3.79341C3.66675 3.92675 3.49341 3.99341 3.32675 3.99341ZM8.00008 2.02675C7.63341 2.02675 7.33342 1.75341 7.33342 1.38675V1.33341C7.33342 0.966748 7.63341 0.666748 8.00008 0.666748C8.36675 0.666748 8.66675 0.966748 8.66675 1.33341C8.66675 1.70008 8.36675 2.02675 8.00008 2.02675Z",
                        fill: "#969AA1"
                      }
                    )
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("span", { className: "hidden dark:inline-block", children: /* @__PURE__ */ jsx(
                "svg",
                {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 16 16",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M14.3533 10.62C14.2466 10.44 13.9466 10.16 13.1999 10.2933C12.7866 10.3667 12.3666 10.4 11.9466 10.38C10.3933 10.3133 8.98659 9.6 8.00659 8.5C7.13993 7.53333 6.60659 6.27333 6.59993 4.91333C6.59993 4.15333 6.74659 3.42 7.04659 2.72666C7.33993 2.05333 7.13326 1.7 6.98659 1.55333C6.83326 1.4 6.47326 1.18666 5.76659 1.48C3.03993 2.62666 1.35326 5.36 1.55326 8.28666C1.75326 11.04 3.68659 13.3933 6.24659 14.28C6.85993 14.4933 7.50659 14.62 8.17326 14.6467C8.27993 14.6533 8.38659 14.66 8.49326 14.66C10.7266 14.66 12.8199 13.6067 14.1399 11.8133C14.5866 11.1933 14.4666 10.8 14.3533 10.62Z",
                      fill: "#969AA1"
                    }
                  )
                }
              ) })
            ]
          }
        )
      ]
    }
  ) });
};
var DarkModeSwitcher_default = DarkModeSwitcher;
var Header = (props) => {
  const t = useT("templateFe");
  console.log("HEADER onLogout prop =", props.onLogout);
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 sm:gap-4 lg:hidden", children: /* @__PURE__ */ jsx(
      "button",
      {
        "aria-controls": "sidebar",
        onClick: (e) => {
          e.stopPropagation();
          props.setSidebarOpen(!props.sidebarOpen);
        },
        className: "z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden",
        children: /* @__PURE__ */ jsxs("span", { className: "relative block h-5.5 w-5.5 cursor-pointer", children: [
          /* @__PURE__ */ jsxs("span", { className: "du-block absolute right-0 h-full w-full", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-300"}`
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "delay-400 !w-full"}`
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-500"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "absolute right-0 h-full w-full rotate-45", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-[0]"}`
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-200"}`
              }
            )
          ] })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsx("form", { action: "https://formbold.com/s/unique_form_id", method: "POST", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("button", { className: "absolute top-1/2 ltr:left-0 rtl:right-0 -translate-y-1/2", children: /* @__PURE__ */ jsxs(
        "svg",
        {
          className: "fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary",
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z",
                fill: ""
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z",
                fill: ""
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: t("search.placeholder"),
          className: "w-full bg-transparent ltr:pl-9 rtl:pr-9 ltr:pr-4 rtl:pl-4 text-black focus:outline-none dark:text-white xl:w-125"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 2xsm:gap-7", children: [
      /* @__PURE__ */ jsxs("ul", { className: "flex items-center gap-2 2xsm:gap-4", children: [
        /* @__PURE__ */ jsx(DarkModeSwitcher_default, {}),
        /* @__PURE__ */ jsx(DropdownNotification_default, {}),
        /* @__PURE__ */ jsx(DropdownMessage_default, {})
      ] }),
      /* @__PURE__ */ jsx(DropdownUser_default, { onLogout: props.onLogout })
    ] })
  ] }) });
};
var Header_default = Header;
var Sidebar = ({ sidebarOpen, setSidebarOpen, sections, logo }) => {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded] = useState(storedSidebarExpanded === "true");
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(e.target) || trigger.current.contains(e.target)) {
        return;
      }
      setSidebarOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [sidebarOpen, setSidebarOpen]);
  useEffect(() => {
    const handleEsc = (e) => {
      if (!sidebarOpen || e.key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [sidebarOpen, setSidebarOpen]);
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.body.classList.add("sidebar-expanded");
    } else {
      document.body.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  const sortedSections = [...sections].sort((a, b) => {
    var _a, _b;
    return ((_a = a.order) != null ? _a : 9999) - ((_b = b.order) != null ? _b : 9999);
  });
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      ref: sidebar,
      className: `absolute left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden
        bg-black duration-300 ease-linear dark:bg-boxdark
        w-[min(290px,85vw)] lg:w-[290px]
        lg:static lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center px-6 py-6", children: [
          /* @__PURE__ */ jsx(NavLink, { to: "/", children: logo ? /* @__PURE__ */ jsx("span", { className: "contents", children: logo }) : /* @__PURE__ */ jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 text-white text-xs font-semibold tracking-wide", children: "APP-LOGO" }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              ref: trigger,
              onClick: () => setSidebarOpen(!sidebarOpen),
              className: "ml-3 block lg:hidden",
              children: /* @__PURE__ */ jsx("svg", { className: "fill-current", width: "20", height: "18", viewBox: "0 0 20 18", children: /* @__PURE__ */ jsx("path", { d: "M19 8.175H2.98748L9.36248 1.6875..." }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear", children: /* @__PURE__ */ jsx("nav", { className: "mt-5 py-4 px-4 lg:mt-9 lg:px-6", children: sortedSections.map((section) => {
          const sortedItems = [...section.items].sort(
            (a, b) => {
              var _a, _b;
              return ((_a = a.order) != null ? _a : 9999) - ((_b = b.order) != null ? _b : 9999);
            }
          );
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-4 ltr:ml-4 rtl:mr-4 text-sm font-semibold text-bodydark2", children: section.name.toUpperCase() }),
            /* @__PURE__ */ jsx("ul", { className: "mb-6 flex flex-col gap-1.5", children: sortedItems.map((item) => {
              var _a, _b;
              const isActive = pathname.includes((_a = item.path) != null ? _a : "");
              return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                NavLink,
                {
                  to: (_b = item.path) != null ? _b : "#",
                  className: `group relative flex items-center gap-2.5
                            rounded-sm py-2 px-4 font-medium text-white
                            duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                            ${isActive && "bg-graydark dark:bg-meta-4"}
                          `,
                  children: [
                    item.icon && /* @__PURE__ */ jsx("span", { className: "fill-current", children: item.icon }),
                    item.label
                  ]
                }
              ) }, item.label);
            }) })
          ] }, section.name);
        }) }) })
      ]
    }
  );
};
var Sidebar_default = Sidebar;
var DashboardLayout = ({
  children,
  sidebarContent,
  logo,
  onLogout,
  footer
}) => {
  var _a, _b, _c, _d, _e, _f;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hasPreset = Boolean(footer == null ? void 0 : footer.preset);
  const hasBlocks = Boolean((footer == null ? void 0 : footer.blocks) && footer.blocks.length > 0);
  return /* @__PURE__ */ jsx("div", { className: "dark:bg-boxdark-2 dark:text-bodydark ltr:font-sans rtl:font-sans rtl:direction-rtl", children: /* @__PURE__ */ jsxs("div", { className: "flex h-screen overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      Sidebar_default,
      {
        sidebarOpen,
        setSidebarOpen,
        sections: sidebarContent,
        logo
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden", children: [
      /* @__PURE__ */ jsx(Header_default, { sidebarOpen, setSidebarOpen, onLogout }),
      /* @__PURE__ */ jsxs("div", { className: "flex min-h-0 flex-1 flex-col", children: [
        /* @__PURE__ */ jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10", children }) }),
        hasPreset ? /* @__PURE__ */ jsx("footer", { className: ["ciscod-footer", (_a = footer == null ? void 0 : footer.className) != null ? _a : ""].join(" "), children: /* @__PURE__ */ jsx("div", { className: "ciscod-footer__inner", children: /* @__PURE__ */ jsxs("div", { className: "ciscod-footer__content", children: [
          /* @__PURE__ */ jsx("div", { className: "ciscod-footer__left", children: (_b = footer == null ? void 0 : footer.preset) == null ? void 0 : _b.leftText }),
          /* @__PURE__ */ jsxs("div", { className: "ciscod-footer__right", children: [
            ((_d = (_c = footer == null ? void 0 : footer.preset) == null ? void 0 : _c.links) == null ? void 0 : _d.length) ? /* @__PURE__ */ jsx("div", { className: "ciscod-footer__links", children: footer.preset.links.map((l) => {
              var _a2;
              const newTab = (_a2 = l.newTab) != null ? _a2 : true;
              return /* @__PURE__ */ jsx(
                "a",
                {
                  href: l.href,
                  target: newTab ? "_blank" : void 0,
                  rel: newTab ? "noreferrer" : void 0,
                  children: l.label
                },
                `${l.label}-${l.href}`
              );
            }) }) : null,
            ((_e = footer == null ? void 0 : footer.preset) == null ? void 0 : _e.version) ? /* @__PURE__ */ jsx("span", { className: "ciscod-footer__version", children: footer.preset.version }) : null
          ] })
        ] }) }) }) : hasBlocks ? /* @__PURE__ */ jsx("footer", { className: ["ciscod-footer", (_f = footer == null ? void 0 : footer.className) != null ? _f : ""].join(" "), children: /* @__PURE__ */ jsx("div", { className: "ciscod-footer__inner", children: /* @__PURE__ */ jsx("div", { className: "ciscod-footer__content", children: footer.blocks.map((block, idx) => /* @__PURE__ */ jsx(React4.Fragment, { children: block }, idx)) }) }) }) : null
      ] })
    ] })
  ] }) });
};
var DashboardLayout_default = DashboardLayout;
var Loader = () => {
  return /* @__PURE__ */ jsx("div", { className: "flex h-screen items-center justify-center bg-white", children: /* @__PURE__ */ jsx("div", { className: "h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-700 border-t-transparent" }) });
};
var Loader_default = Loader;
function Template({
  children,
  sidebarContent = [],
  logo,
  onLogout,
  navbar,
  footer
}) {
  var _a, _b, _c, _d, _e, _f;
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1e3);
  }, []);
  const resolvedBrandNode = (_f = (_a = navbar == null ? void 0 : navbar.brandSlot) != null ? _a : logo) != null ? _f : (navbar == null ? void 0 : navbar.brand) ? /* @__PURE__ */ jsx("a", { href: (_b = navbar.brand.href) != null ? _b : "/", children: navbar.brand.logoSrc ? /* @__PURE__ */ jsx(
    "img",
    {
      src: navbar.brand.logoSrc,
      alt: (_d = (_c = navbar.brand.logoAlt) != null ? _c : navbar.brand.title) != null ? _d : "Logo",
      className: "h-8"
    }
  ) : /* @__PURE__ */ jsx("span", { className: "font-semibold", children: (_e = navbar.brand.title) != null ? _e : "" }) }) : void 0;
  const resolvedLegacySidebarContent = sidebarContent;
  return loading ? /* @__PURE__ */ jsx(Loader_default, {}) : /* @__PURE__ */ jsx(
    DashboardLayout_default,
    {
      sidebarContent: resolvedLegacySidebarContent,
      logo: resolvedBrandNode,
      onLogout,
      footer,
      children
    }
  );
}
var dashboard_default = Template;
var Breadcrumb = ({ pageName }) => {
  const t = useT("templateFe");
  return /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-title-md2 font-semibold text-black dark:text-white", children: pageName }),
    /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ol", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { className: "font-medium", to: "/", children: [
        t("breadcrumb.title"),
        " /"
      ] }) }),
      /* @__PURE__ */ jsx("li", { className: "font-medium text-primary", children: pageName })
    ] }) })
  ] });
};
var Breadcrumb_default = Breadcrumb;
function ControlledZodDynamicForm({
  schema,
  fields,
  values,
  onChangeField,
  onSubmit,
  submitLabel = "Submit",
  header
}) {
  const [errors, setErrors] = useState({});
  function handleInputChange(e) {
    const { name, value, type } = e.target;
    let newValue = value;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    } else if (type === "number") {
      newValue = parseFloat(value) || 0;
    }
    onChangeField(name, newValue);
  }
  function handleSubmit(e) {
    e.preventDefault();
    try {
      const parsed = schema.parse(values);
      onSubmit(parsed);
    } catch (err) {
      if (err instanceof ZodError) {
        const newErrors = {};
        let detailsErrorFound = false;
        err.errors.forEach((issue) => {
          const pathKey = issue.path.join(".");
          newErrors[pathKey] = issue.message;
          if (issue.path[0] === "details") {
            detailsErrorFound = true;
          }
        });
        if (detailsErrorFound) {
          alert("Please fill out all required fields in Details.");
        }
        setErrors(newErrors);
      }
    }
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
    header && /* @__PURE__ */ jsx("div", { className: "mb-4", children: header }),
    fields.map((field) => {
      var _a;
      const fieldError = errors[field.name];
      const fieldValue = (_a = values[field.name]) != null ? _a : "";
      return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: field.name, className: "block mb-1 font-medium text-gray-700", children: field.label }),
        (() => {
          var _a2, _b;
          switch (field.type) {
            case "textarea":
              return /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: field.name,
                  name: field.name,
                  placeholder: field.placeholder,
                  value: typeof fieldValue === "string" ? fieldValue : String(fieldValue != null ? fieldValue : ""),
                  onChange: handleInputChange,
                  className: "border border-gray-300 rounded-lg px-3 py-2 w-full ltr:text-left rtl:text-right"
                }
              );
            case "select":
              return /* @__PURE__ */ jsxs(
                "select",
                {
                  id: field.name,
                  name: field.name,
                  value: typeof fieldValue === "string" || typeof fieldValue === "number" ? fieldValue : "",
                  onChange: handleInputChange,
                  className: "border border-gray-300 rounded-lg px-3 py-2 w-full ltr:text-left rtl:text-right",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "-- Select an option --" }),
                    (_a2 = field.options) == null ? void 0 : _a2.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, String(opt.value)))
                  ]
                }
              );
            case "checkbox":
              return /* @__PURE__ */ jsx(
                "input",
                {
                  id: field.name,
                  name: field.name,
                  type: "checkbox",
                  checked: !!fieldValue,
                  onChange: handleInputChange,
                  className: "h-5 w-5 border-gray-300 rounded"
                }
              );
            case "multiSelect": {
              const multiOpts = (_b = field.options) != null ? _b : [];
              const selectedValues = Array.isArray(fieldValue) ? fieldValue.map((id) => {
                const found = multiOpts.find((o) => o.value === id);
                if (found) return found;
                return {
                  label: String(id) || "???",
                  value: String(id)
                };
              }) : [];
              return /* @__PURE__ */ jsx(
                Select,
                {
                  isMulti: true,
                  options: multiOpts,
                  value: selectedValues,
                  onChange: (selected) => {
                    const arrIds = selected.map((opt) => opt.value);
                    onChangeField(field.name, arrIds);
                  },
                  className: "w-full"
                }
              );
            }
            case "custom": {
              const CustomComp = field.component;
              if (!CustomComp) {
                return /* @__PURE__ */ jsxs("p", { style: { color: "red" }, children: [
                  "Missing component for custom field: ",
                  field.name
                ] }, field.name);
              }
              const subErrors = findNestedErrors(errors, field.name);
              return /* @__PURE__ */ jsx(
                CustomComp,
                __spreadValues({
                  value: fieldValue,
                  onChange: (newVal) => onChangeField(field.name, newVal),
                  errors: subErrors
                }, field.props),
                field.name
              );
            }
            default:
              return /* @__PURE__ */ jsx(
                "input",
                {
                  id: field.name,
                  name: field.name,
                  type: field.type === "number" ? "number" : "text",
                  step: field.step || "1",
                  placeholder: field.placeholder,
                  value: field.type === "number" ? typeof fieldValue === "number" ? fieldValue : Number(fieldValue) || 0 : typeof fieldValue === "string" ? fieldValue : String(fieldValue != null ? fieldValue : ""),
                  onChange: handleInputChange,
                  className: "border border-gray-300 rounded-lg px-3 py-2 w-full ltr:text-left rtl:text-right"
                }
              );
          }
        })(),
        fieldError && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: fieldError })
      ] }, field.name);
    }),
    /* @__PURE__ */ jsx("div", { className: "ltr:text-right rtl:text-left", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: "inline-block px-5 py-2 bg-indigo-600 text-white rounded-md",
        children: submitLabel
      }
    ) })
  ] });
}
function findNestedErrors(allErrors, rootField) {
  const nested = {};
  for (const key in allErrors) {
    if (key.startsWith(`${rootField}.`)) {
      const subPath = key.slice(rootField.length + 1);
      const [indexStr, fieldName] = subPath.split(".");
      const index = parseInt(indexStr, 10);
      if (!isNaN(index)) {
        if (!nested[index]) {
          nested[index] = {};
        }
        nested[index][fieldName] = allErrors[key];
      }
    }
  }
  return nested;
}
var TableErrorBoundary = class extends React4.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("TableErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx(TranslatedErrorMessage, {});
    }
    return this.props.children;
  }
};
var TranslatedErrorMessage = () => {
  const t = useT("template-fe");
  return /* @__PURE__ */ jsx("div", { className: "p-4 text-red-600 bg-red-50 border border-red-300 rounded", children: t("table.errorBoundary.fallbackMessage") });
};
var TableErrorBoundary_default = TableErrorBoundary;

// src/hooks/useGeneratePageNumbers.tsx
function generatePageNumbers(current, total) {
  const maxPagesToShow = 5;
  const pages = [];
  if (total <= maxPagesToShow) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }
  pages.push(1);
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) {
    pages.push("...");
  }
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (end < total - 1) {
    pages.push("...");
  }
  pages.push(total);
  return pages;
}
var TableLoader = () => {
  return /* @__PURE__ */ jsxs("div", { className: "dot-spinner dar ", children: [
    /* @__PURE__ */ jsx("div", { className: "dot-spinner__dot" }),
    /* @__PURE__ */ jsx("div", { className: "dot-spinner__dot" }),
    /* @__PURE__ */ jsx("div", { className: "dot-spinner__dot" }),
    /* @__PURE__ */ jsx("div", { className: "dot-spinner__dot" }),
    /* @__PURE__ */ jsx("div", { className: "dot-spinner__dot" }),
    /* @__PURE__ */ jsx("div", { className: "dot-spinner__dot" }),
    /* @__PURE__ */ jsx("div", { className: "dot-spinner__dot" }),
    /* @__PURE__ */ jsx("div", { className: "dot-spinner__dot" })
  ] });
};
var TablePopover = ({ anchor, children, onClose }) => {
  const popoverRef = useRef(null);
  useEffect(() => {
    function handleClick(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target) && anchor && !anchor.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [anchor, onClose]);
  if (!anchor) return null;
  const rect = anchor.getBoundingClientRect();
  const style = {
    position: "fixed",
    top: rect.bottom + 8,
    left: rect.left,
    zIndex: 9999,
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    boxShadow: "0 8px 32px 0 rgba(60,60,60,0.18)",
    padding: 0,
    minWidth: 200,
    animation: "fadeIn 0.18s"
  };
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsxs("div", { ref: popoverRef, style, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-2 left-4 w-4 h-4", children: /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" }) }),
      children,
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition",
          onClick: onClose,
          "aria-label": "Close",
          children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-4 h-4",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 2,
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })
            }
          )
        }
      )
    ] }),
    document.body
  );
};
function InlineEditableCell(props) {
  const { value, row, rowIndex, onCommit, editor, children } = props;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value != null ? value : "");
  const startEdit = useCallback(() => {
    setDraft(value != null ? value : "");
    setEditing(true);
  }, [value]);
  const commit = useCallback(() => {
    setEditing(false);
    onCommit(draft);
  }, [draft, onCommit]);
  const cancel = useCallback(() => {
    setEditing(false);
    setDraft(value != null ? value : "");
  }, [value]);
  if (!editing) {
    return /* @__PURE__ */ jsx("div", { onDoubleClick: startEdit, className: "cursor-text", children });
  }
  if (editor) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center", children: editor({
      value: draft,
      row,
      rowIndex,
      onChange: setDraft,
      onCommit: commit,
      onCancel: cancel
    }) });
  }
  return /* @__PURE__ */ jsx(
    "input",
    {
      autoFocus: true,
      type: "text",
      value: String(draft != null ? draft : ""),
      onChange: (e) => setDraft(e.target.value),
      onBlur: commit,
      onKeyDown: (e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") cancel();
      },
      className: "px-2 py-1 text-sm border rounded-md dark:bg-gray-700 dark:text-white"
    }
  );
}
function TableDataCustomBase({
  columns,
  data,
  errorMessage,
  pagination,
  loading,
  toolbarItems,
  enableSelection,
  enableSorting,
  enableFilter,
  enableInlineEdit,
  filterQuery,
  onFilterQueryChange,
  onSelectionChange,
  onCellEdit
}) {
  var _a, _b, _c;
  const t = useT("templateFe");
  const leftItems = (toolbarItems != null ? toolbarItems : []).filter(
    (it) => {
      var _a2;
      return it.visible !== false && ((_a2 = it.position) != null ? _a2 : "left") === "left";
    }
  );
  const rightItems = (toolbarItems != null ? toolbarItems : []).filter(
    (it) => it.visible !== false && it.position === "right"
  );
  const [popover, setPopover] = useState(null);
  const closePopover = useCallback(() => setPopover(null), []);
  const [selected, setSelected] = useState(/* @__PURE__ */ new Set());
  const toggleSelectAll = useCallback((checked, count) => {
    const next = /* @__PURE__ */ new Set();
    if (checked) {
      for (let i = 0; i < count; i++) next.add(i);
    }
    setSelected(next);
  }, []);
  const toggleRowSelection = useCallback((index) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const onHeaderClick = useCallback(
    (colIndex, col) => {
      if (!enableSorting || col.sortable === false) return;
      setSortBy((prev) => prev === colIndex ? colIndex : colIndex);
      setSortDir((prev) => sortBy === colIndex ? prev === "asc" ? "desc" : "asc" : "asc");
    },
    [enableSorting, sortBy]
  );
  const [internalQuery, setInternalQuery] = useState("");
  const activeQuery = (filterQuery != null ? filterQuery : internalQuery).trim();
  const visibleData = useMemo(() => {
    let rows = [...data];
    if (enableFilter && activeQuery.length > 0) {
      const q = activeQuery.toLowerCase();
      rows = rows.filter((row) => {
        return columns.some((col) => {
          const keys = Array.isArray(col.key) ? col.key : [col.key];
          const val = keys.map((k) => {
            var _a2;
            return String((_a2 = row[k]) != null ? _a2 : "");
          }).join(" ").toLowerCase();
          if (col.filterPredicate) {
            return col.filterPredicate(val, row, q);
          }
          return val.includes(q);
        });
      });
    }
    if (enableSorting && sortBy != null) {
      const col = columns[sortBy];
      rows.sort((a, b) => {
        const keys = Array.isArray(col.key) ? col.key : [col.key];
        const va = keys.map((k) => a[k]);
        const vb = keys.map((k) => b[k]);
        const left = va.length > 1 ? va.join(" ") : va[0];
        const right = vb.length > 1 ? vb.join(" ") : vb[0];
        let cmp = 0;
        if (typeof col.sortComparator === "function") {
          cmp = col.sortComparator(left, right, a, b);
        } else {
          const la = left != null ? left : "";
          const lb = right != null ? right : "";
          const sa = String(la).toLowerCase();
          const sb = String(lb).toLowerCase();
          if (sa < sb) cmp = -1;
          else if (sa > sb) cmp = 1;
          else cmp = 0;
        }
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [data, columns, enableFilter, activeQuery, enableSorting, sortBy, sortDir]);
  React4.useEffect(() => {
    if (!onSelectionChange) return;
    const indices = Array.from(selected.values()).sort((a, b) => a - b);
    const rows = indices.map((i) => visibleData[i]).filter(Boolean);
    onSelectionChange(rows, indices);
  }, [selected, visibleData, onSelectionChange]);
  return /* @__PURE__ */ jsxs("section", { children: [
    popover && /* @__PURE__ */ jsx(TablePopover, { anchor: popover.anchor, onClose: closePopover, children: popover.content }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg", children: [
      (leftItems.length > 0 || rightItems.length > 0 || enableFilter) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 ltr:lg:space-x-4 rtl:lg:space-x-reverse", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center flex-wrap gap-3", children: [
          leftItems.map((it, i) => /* @__PURE__ */ jsx("span", { className: "contents", children: it.node }, i)),
          enableFilter && /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: filterQuery != null ? filterQuery : internalQuery,
              onChange: (e) => onFilterQueryChange ? onFilterQueryChange(e.target.value) : setInternalQuery(e.target.value),
              placeholder: (_a = t("table.filter")) != null ? _a : "Filter\u2026",
              className: "px-3 py-2 text-sm border rounded-md dark:bg-gray-700 dark:text-white"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center flex-wrap gap-3", children: rightItems.map((it, i) => /* @__PURE__ */ jsx("span", { className: "contents", children: it.node }, i)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-gray-500 dark:text-gray-400 ltr:text-left rtl:text-right", children: [
        /* @__PURE__ */ jsx("thead", { className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400", children: /* @__PURE__ */ jsxs("tr", { children: [
          enableSelection && /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              "aria-label": "Select all",
              checked: selected.size > 0 && selected.size === visibleData.length,
              onChange: (e) => toggleSelectAll(e.target.checked, visibleData.length)
            }
          ) }),
          columns.map((col, i) => /* @__PURE__ */ jsx(
            "th",
            {
              className: "px-4 py-3 select-none cursor-pointer",
              onClick: () => onHeaderClick(i, col),
              title: enableSorting && col.sortable !== false ? "Sort" : void 0,
              children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                col.title,
                enableSorting && sortBy === i && /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: sortDir === "asc" ? /* @__PURE__ */ jsx("path", { d: "M10 5l-5 6h10L10 5z" }) : /* @__PURE__ */ jsx("path", { d: "M10 15l5-6H5l5 6z" }) })
              ] })
            },
            i
          ))
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: loading ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
          "td",
          {
            colSpan: (enableSelection ? 1 : 0) + columns.length,
            className: "py-4 text-center",
            children: /* @__PURE__ */ jsx(TableLoader, {})
          }
        ) }) : errorMessage ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
          "td",
          {
            colSpan: (enableSelection ? 1 : 0) + columns.length,
            className: "py-4 text-center text-red-600",
            children: errorMessage
          }
        ) }) : visibleData.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
          "td",
          {
            colSpan: (enableSelection ? 1 : 0) + columns.length,
            className: "py-4 text-center",
            children: t("table.noData")
          }
        ) }) : visibleData.map((row, r) => /* @__PURE__ */ jsxs("tr", { className: "border-b", children: [
          enableSelection && /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              "aria-label": `Select row ${r + 1}`,
              checked: selected.has(r),
              onChange: () => toggleRowSelection(r)
            }
          ) }),
          columns.map((col, c) => {
            var _a2;
            let content;
            if (Array.isArray(col.key)) {
              const vals = col.key.map((k) => {
                var _a3;
                return (_a3 = row[k]) != null ? _a3 : "";
              });
              const display = vals.join(" - ");
              content = col.render ? col.render(vals, row, setPopover) : display;
            } else {
              const val = row[col.key];
              const display = String(val != null ? val : "");
              if (enableInlineEdit && col.editable) {
                content = /* @__PURE__ */ jsx(
                  InlineEditableCell,
                  {
                    value: val,
                    row,
                    rowIndex: r,
                    columnKey: col.key,
                    onCommit: (next) => onCellEdit == null ? void 0 : onCellEdit(r, col.key, next, row),
                    editor: col.editor,
                    className: col.cellClassName,
                    children: col.render ? col.render(val, row, setPopover) : display
                  }
                );
              } else {
                content = col.render ? col.render(val, row, setPopover) : display;
              }
            }
            return /* @__PURE__ */ jsx(
              "td",
              {
                className: `px-4 py-3 ltr:text-left rtl:text-right ${(_a2 = col.cellClassName) != null ? _a2 : ""}`,
                children: content
              },
              c
            );
          })
        ] }, r)) })
      ] }) }),
      pagination && /* @__PURE__ */ jsxs(
        "nav",
        {
          className: "flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0",
          "aria-label": "Table navigation",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-gray-500 dark:text-gray-400", children: t("table.pagination.showing", {
              from: (pagination.currentPage - 1) * ((_b = pagination.pageSize) != null ? _b : 10) + 1,
              to: Math.min(
                pagination.currentPage * ((_c = pagination.pageSize) != null ? _c : 10),
                pagination.totalItems
              ),
              total: pagination.totalItems
            }) }),
            /* @__PURE__ */ jsxs("ul", { className: "inline-flex items-stretch -space-x-px ltr:flex-row rtl:flex-row-reverse", children: [
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    var _a2;
                    return (_a2 = pagination.onPageChange) == null ? void 0 : _a2.call(pagination, pagination.currentPage - 1);
                  },
                  disabled: pagination.currentPage <= 1,
                  className: "flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: t("table.pagination.previous") }),
                    /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 rtl:rotate-180", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: document.dir === "rtl" ? "M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" : "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      }
                    ) })
                  ]
                }
              ) }),
              generatePageNumbers(pagination.currentPage, pagination.totalPages).map(
                (p, i) => typeof p === "string" ? /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { className: "flex items-center justify-center px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400", children: p }) }, i) : /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      var _a2;
                      return (_a2 = pagination.onPageChange) == null ? void 0 : _a2.call(pagination, p);
                    },
                    className: `flex items-center justify-center px-3 py-2 text-sm border ${p === pagination.currentPage ? "z-10 text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:bg-gray-700 dark:text-white dark:border-gray-700" : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700"}`,
                    children: p
                  }
                ) }, p)
              ),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    var _a2;
                    return (_a2 = pagination.onPageChange) == null ? void 0 : _a2.call(pagination, pagination.currentPage + 1);
                  },
                  disabled: pagination.currentPage >= pagination.totalPages,
                  className: "flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: t("table.pagination.next") }),
                    /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 rtl:rotate-180", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: document.dir === "rtl" ? "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" : "M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      }
                    ) })
                  ]
                }
              ) })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
var TableDataCustomBase_default = TableDataCustomBase;
function TableDataCustom(props) {
  return /* @__PURE__ */ jsx(TableErrorBoundary_default, { children: /* @__PURE__ */ jsx(TableDataCustomBase_default, __spreadValues({}, props)) });
}
var TableDataCustom_default = TableDataCustom;
function WidgetContainer({
  title,
  children,
  onStartDrag,
  onStartResize,
  onStartResizeEast,
  onStartResizeSouth,
  onStartResizeSouthEast,
  draggable = true,
  resizable = true,
  onRemove,
  onDuplicate
}) {
  const headerRef = useRef(null);
  return /* @__PURE__ */ jsxs("div", { className: "relative rounded-lg border border-gray-200 bg-white dark:bg-gray-800 shadow-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: headerRef,
        className: "flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-700 select-none " + (draggable ? "cursor-grab" : "cursor-default"),
        style: { touchAction: "none" },
        onPointerDown: (e) => {
          if (e.shiftKey && resizable && onStartResize) return onStartResize(e);
          if (draggable) onStartDrag == null ? void 0 : onStartDrag(e);
        },
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-200", children: title }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            typeof onDuplicate === "function" ? /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "inline-flex items-center justify-center w-6 h-6 text-xs rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200",
                onClick: onDuplicate,
                onPointerDown: (e) => e.stopPropagation(),
                "aria-label": "Duplicate widget",
                title: "Duplicate",
                children: "\u29C9"
              }
            ) : null,
            typeof onRemove === "function" ? /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "inline-flex items-center justify-center w-6 h-6 text-xs rounded bg-red-100 hover:bg-red-200 dark:bg-red-800/40 dark:hover:bg-red-700/50 text-red-700 dark:text-red-200",
                onClick: onRemove,
                onPointerDown: (e) => e.stopPropagation(),
                "aria-label": "Remove widget",
                title: "Remove",
                children: "\xD7"
              }
            ) : null,
            resizable ? /* @__PURE__ */ jsx(
              "div",
              {
                className: "shrink-0 w-4 h-4 rounded bg-gray-300 dark:bg-gray-600 cursor-se-resize",
                style: { touchAction: "none" },
                onPointerDown: onStartResize,
                "aria-label": "Resize",
                title: "Resize"
              }
            ) : null
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "p-3", children }),
    resizable ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-0 right-0 h-full w-1 cursor-ew-resize",
          style: { touchAction: "none" },
          onPointerDown: (e) => {
            e.stopPropagation();
            onStartResizeEast == null ? void 0 : onStartResizeEast(e);
          },
          "aria-label": "Resize east"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute bottom-0 left-0 w-full h-1 cursor-ns-resize",
          style: { touchAction: "none" },
          onPointerDown: (e) => {
            e.stopPropagation();
            onStartResizeSouth == null ? void 0 : onStartResizeSouth(e);
          },
          "aria-label": "Resize south"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute bottom-0 right-0 w-3 h-3 cursor-se-resize",
          style: { touchAction: "none" },
          onPointerDown: (e) => {
            e.stopPropagation();
            onStartResizeSouthEast == null ? void 0 : onStartResizeSouthEast(e);
          },
          "aria-label": "Resize south-east"
        }
      )
    ] }) : null
  ] });
}

// src/components/Dashboard/Widgets/layoutUtils.ts
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function roundToCell(px, cell) {
  return Math.round(px / cell);
}
function positionToStyle(pos) {
  return {
    gridColumnStart: pos.x + 1,
    gridColumnEnd: pos.x + 1 + pos.w,
    gridRowStart: pos.y + 1,
    gridRowEnd: pos.y + 1 + pos.h
  };
}
function intersects(a, b) {
  const ax2 = a.x + a.w;
  const ay2 = a.y + a.h;
  const bx2 = b.x + b.w;
  const by2 = b.y + b.h;
  const noOverlap = ax2 <= b.x || bx2 <= a.x || ay2 <= b.y || by2 <= a.y;
  return !noOverlap;
}
var DefaultChartAdapter = {
  render(kind, props) {
    switch (kind) {
      case "bar":
        return renderBar(props);
      case "line":
        return renderLine(props);
      case "pie":
        return renderPie(props);
      default:
        return /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Unknown chart kind" });
    }
  }
};
function coerceNumbers(value) {
  if (Array.isArray(value)) {
    return value.map((v) => typeof v === "number" ? v : Number(v)).filter((v) => !Number.isNaN(v));
  }
  return [];
}
function renderBar(props) {
  const data = coerceNumbers(props.data);
  const width = typeof props.width === "number" ? props.width : 300;
  const height = typeof props.height === "number" ? props.height : 120;
  const padding = 16;
  const max = Math.max(1, ...data);
  const barWidth = (width - padding * 2) / Math.max(1, data.length);
  const color = typeof props.color === "string" ? props.color : "#4f46e5";
  return /* @__PURE__ */ jsx("svg", { width, height, role: "img", "aria-label": "Bar chart", children: data.map((v, i) => {
    const h = (height - padding * 2) * v / max;
    const x = padding + i * barWidth + barWidth * 0.1;
    const y = height - padding - h;
    return /* @__PURE__ */ jsx("rect", { x, y, width: barWidth * 0.8, height: h, fill: color, rx: 2 }, i);
  }) });
}
function renderLine(props) {
  const data = coerceNumbers(props.data);
  const width = typeof props.width === "number" ? props.width : 300;
  const height = typeof props.height === "number" ? props.height : 120;
  const padding = 16;
  const max = Math.max(1, ...data);
  const color = typeof props.color === "string" ? props.color : "#16a34a";
  const points = data.map((v, i) => {
    const x = padding + i * ((width - padding * 2) / Math.max(1, data.length - 1));
    const y = height - padding - (height - padding * 2) * v / max;
    return `${x},${y}`;
  });
  return /* @__PURE__ */ jsx("svg", { width, height, role: "img", "aria-label": "Line chart", children: /* @__PURE__ */ jsx("polyline", { points: points.join(" "), fill: "none", stroke: color, strokeWidth: 2 }) });
}
function renderPie(props) {
  const data = coerceNumbers(props.data);
  const size = typeof props.size === "number" ? props.size : 120;
  const radius = size / 2;
  const total = data.reduce((acc, v) => acc + v, 0) || 1;
  const colors = Array.isArray(props.colors) ? props.colors : ["#f97316", "#22c55e", "#3b82f6", "#e11d48"];
  let startAngle = 0;
  const slices = data.map((v, i) => {
    const angle = v / total * Math.PI * 2;
    const x1 = radius + radius * Math.cos(startAngle);
    const y1 = radius + radius * Math.sin(startAngle);
    const x2 = radius + radius * Math.cos(startAngle + angle);
    const y2 = radius + radius * Math.sin(startAngle + angle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const path = `M ${radius},${radius} L ${x1},${y1} A ${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} z`;
    startAngle += angle;
    return /* @__PURE__ */ jsx("path", { d: path, fill: colors[i % colors.length] }, i);
  });
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, role: "img", "aria-label": "Pie chart", children: slices });
}
function DashboardGrid({
  grid,
  widgets,
  onLayoutChange,
  renderWidget,
  chartAdapter,
  enableDrag = true,
  enableResize = true,
  showActions = true,
  persistKey
}) {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState(widgets);
  const [drag, setDrag] = useState(null);
  const latestLayoutRef = useRef(widgets);
  const hydratedFromStorageRef = useRef(false);
  useLayoutEffect(() => {
    if (!persistKey || typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(persistKey);
      if (raw) {
        const incoming = JSON.stringify(widgets);
        if (raw !== incoming) {
          const saved = JSON.parse(raw);
          if (Array.isArray(saved)) {
            hydratedFromStorageRef.current = true;
            latestLayoutRef.current = saved;
            setLayout(saved);
            onLayoutChange == null ? void 0 : onLayoutChange(saved);
          }
        }
      }
    } catch (e) {
    }
  }, []);
  function commitLayout(next) {
    setLayout(next);
    onLayoutChange == null ? void 0 : onLayoutChange(next);
    latestLayoutRef.current = next;
    if (persistKey && typeof window !== "undefined") {
      try {
        window.localStorage.setItem(persistKey, JSON.stringify(next));
      } catch (e) {
      }
    }
  }
  useLayoutEffect(() => {
    if (hydratedFromStorageRef.current) {
      hydratedFromStorageRef.current = false;
      return;
    }
    latestLayoutRef.current = widgets;
    setLayout(widgets);
  }, [widgets]);
  function removeWidget(id) {
    const next = layout.filter((w) => w.id !== id);
    commitLayout(next);
  }
  function duplicateWidget(id) {
    const idx = findById(id);
    if (idx === -1) return;
    const src = layout[idx];
    let copyIndex = 2;
    let newId = `${src.id}-copy`;
    while (layout.some((w) => w.id === newId)) {
      newId = `${src.id}-copy-${copyIndex++}`;
    }
    const rectPos = __spreadValues({}, src.position);
    let candidate = __spreadProps(__spreadValues({}, rectPos), { x: Math.min(rectPos.x + rectPos.w, grid.cols - rectPos.w) });
    if (layout.some((w, i) => i !== idx && intersects(candidate, w.position))) {
      candidate = __spreadProps(__spreadValues({}, rectPos), { y: rectPos.y + rectPos.h });
    }
    const isFree = (pos) => !layout.some((w) => intersects(pos, w.position));
    if (!isFree(candidate)) {
      let found = false;
      for (let y = 0; y < 100 && !found; y++) {
        for (let x = 0; x <= grid.cols - rectPos.w && !found; x++) {
          const pos = { x, y, w: rectPos.w, h: rectPos.h };
          if (isFree(pos)) {
            candidate = pos;
            found = true;
          }
        }
      }
    }
    const copy = __spreadProps(__spreadValues({}, src), { id: newId, position: candidate });
    const next = [...layout, copy];
    commitLayout(next);
  }
  function findById(id) {
    return layout.findIndex((w) => w.id === id);
  }
  function startDrag(id, mode, edge) {
    return (e) => {
      var _a, _b;
      if (mode === "move" && !enableDrag) return;
      if (mode === "resize" && !enableResize) return;
      const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
      if (!rect) return;
      const idx = findById(id);
      if (idx === -1) return;
      const pos = layout[idx].position;
      (_b = containerRef.current) == null ? void 0 : _b.setPointerCapture(e.pointerId);
      setDrag({
        id,
        startX: e.clientX - rect.left,
        startY: e.clientY - rect.top,
        origPos: __spreadValues({}, pos),
        mode,
        edge
      });
    };
  }
  function onPointerMove(e) {
    var _a, _b;
    if (!drag) return;
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - drag.startX;
    const dy = y - drag.startY;
    const colWidth = (rect.width - (grid.cols - 1) * grid.gap) / grid.cols;
    const deltaCols = roundToCell(dx, colWidth);
    const deltaRows = roundToCell(dy, grid.rowHeight);
    const idx = findById(drag.id);
    if (idx === -1) return;
    const current = layout[idx];
    const nextPos = __spreadValues({}, drag.origPos);
    if (drag.mode === "move") {
      nextPos.x = clamp(drag.origPos.x + deltaCols, 0, grid.cols - drag.origPos.w);
      nextPos.y = Math.max(0, drag.origPos.y + deltaRows);
    } else {
      const edge = (_b = drag.edge) != null ? _b : "se";
      if (edge.includes("e")) {
        nextPos.w = clamp(drag.origPos.w + deltaCols, 1, grid.cols - drag.origPos.x);
      }
      if (edge.includes("s")) {
        nextPos.h = Math.max(1, drag.origPos.h + deltaRows);
      }
      if (edge.includes("w")) {
        const newX = clamp(drag.origPos.x + deltaCols, 0, drag.origPos.x + drag.origPos.w - 1);
        const deltaX = newX - drag.origPos.x;
        nextPos.x = newX;
        nextPos.w = Math.max(1, drag.origPos.w - deltaX);
      }
      if (edge.includes("n")) {
        const newY = Math.max(0, drag.origPos.y + deltaRows);
        const deltaY = newY - drag.origPos.y;
        nextPos.y = newY;
        nextPos.h = Math.max(1, drag.origPos.h - deltaY);
      }
    }
    const collides = layout.some((w, i) => i !== idx && intersects(nextPos, w.position));
    if (collides) return;
    const next = [...layout];
    next[idx] = __spreadProps(__spreadValues({}, current), { position: nextPos });
    latestLayoutRef.current = next;
    setLayout(next);
  }
  function onPointerUp(e) {
    var _a;
    if (!drag) return;
    (_a = containerRef.current) == null ? void 0 : _a.releasePointerCapture(e.pointerId);
    commitLayout(latestLayoutRef.current);
    setDrag(null);
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: "grid",
      style: {
        gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))`,
        gridAutoRows: `${grid.rowHeight}px`,
        gap: `${grid.gap}px`
      },
      onPointerMove,
      onPointerUp,
      children: layout.map((w) => /* @__PURE__ */ jsx("div", { style: positionToStyle(w.position), children: /* @__PURE__ */ jsx(
        WidgetContainer,
        {
          title: w.title,
          draggable: enableDrag,
          resizable: enableResize,
          onStartDrag: enableDrag ? startDrag(w.id, "move") : void 0,
          onStartResize: enableResize ? startDrag(w.id, "resize", "se") : void 0,
          onStartResizeEast: enableResize ? startDrag(w.id, "resize", "e") : void 0,
          onStartResizeSouth: enableResize ? startDrag(w.id, "resize", "s") : void 0,
          onStartResizeSouthEast: enableResize ? startDrag(w.id, "resize", "se") : void 0,
          onRemove: showActions ? () => removeWidget(w.id) : void 0,
          onDuplicate: showActions ? () => duplicateWidget(w.id) : void 0,
          children: renderWidget ? renderWidget(w) : /* @__PURE__ */ jsx(DefaultWidgetRenderer, { widget: w, chartAdapter })
        }
      ) }, w.id))
    }
  );
}
function DefaultWidgetRenderer({
  widget,
  chartAdapter
}) {
  var _a, _b, _c, _d;
  const { type, props } = widget;
  switch (type) {
    case "card":
      return /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-700 dark:text-gray-200", children: String((_a = props == null ? void 0 : props.content) != null ? _a : "Card") });
    case "stat":
      return /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl font-semibold text-gray-900 dark:text-white", children: String((_b = props == null ? void 0 : props.value) != null ? _b : "0") }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: String((_c = props == null ? void 0 : props.label) != null ? _c : "Stat") })
      ] });
    case "progress": {
      const v = typeof (props == null ? void 0 : props.value) === "number" ? props.value : 0;
      return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "h-2 bg-gray-200 dark:bg-gray-700 rounded", children: /* @__PURE__ */ jsx("div", { className: "h-2 bg-indigo-600 rounded", style: { width: `${clamp(v, 0, 100)}%` } }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400", children: [
          v,
          "%"
        ] })
      ] });
    }
    case "activity": {
      const items = Array.isArray(props == null ? void 0 : props.items) ? props.items : [];
      return /* @__PURE__ */ jsxs("ul", { className: "space-y-1 text-sm text-gray-700 dark:text-gray-200", children: [
        items.length === 0 ? /* @__PURE__ */ jsx("li", { className: "text-gray-500 dark:text-gray-400", children: "No activity" }) : null,
        items.map((it, i) => /* @__PURE__ */ jsx("li", { children: String(it) }, i))
      ] });
    }
    case "chart": {
      const kind = (_d = props == null ? void 0 : props.kind) != null ? _d : "line";
      const adapter = chartAdapter != null ? chartAdapter : DefaultChartAdapter;
      return adapter.render(kind, props != null ? props : {});
    }
    case "custom":
    default:
      return /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Provide a custom renderer." });
  }
}
function useLogin({
  login,
  schema
}) {
  const [values, setValues] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  function update(key, value) {
    setValues((v) => __spreadProps(__spreadValues({}, v), { [key]: value }));
  }
  function submit() {
    return __async(this, null, function* () {
      setError(null);
      setLoading(true);
      try {
        const input = schema ? schema.parse(values) : values;
        const res = yield login(input);
        setResult(res);
        return res;
      } catch (e) {
        const message = e instanceof Error ? e.message : "Login failed";
        setError(message);
        throw e;
      } finally {
        setLoading(false);
      }
    });
  }
  return { values, update, submit, loading, error, result };
}
var useLogin_default = useLogin;
function useRegister({
  register,
  schema
}) {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  function update(key, value) {
    setValues((v) => __spreadProps(__spreadValues({}, v), { [key]: value }));
  }
  function submit() {
    return __async(this, null, function* () {
      setError(null);
      setLoading(true);
      try {
        const payload = schema ? schema.parse(values) : values;
        const res = yield register(payload);
        setUser(res);
        return res;
      } catch (e) {
        const message = e instanceof Error ? e.message : "Registration failed";
        setError(message);
        throw e;
      } finally {
        setLoading(false);
      }
    });
  }
  return { values, update, submit, loading, error, user };
}
var useRegister_default = useRegister;
function usePasswordReset({
  reset,
  schema
}) {
  const [values, setValues] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  function update(key, value) {
    setValues((v) => __spreadProps(__spreadValues({}, v), { [key]: value }));
  }
  function submit() {
    return __async(this, null, function* () {
      setError(null);
      setSuccess(false);
      setLoading(true);
      try {
        const input = schema ? schema.parse(values) : values;
        yield reset(input);
        setSuccess(true);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Password reset failed";
        setError(message);
        throw e;
      } finally {
        setLoading(false);
      }
    });
  }
  return { values, update, submit, loading, error, success };
}
var usePasswordReset_default = usePasswordReset;
function useLiveRegion() {
  const ref = useRef(null);
  function announce(message) {
    if (ref.current) {
      ref.current.textContent = message;
    }
  }
  return { ref, announce };
}
function useFocusTrap(active) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active) return;
    const current = ref.current;
    if (!current) return;
    const el = current;
    function onKeyDown(e) {
      if (e.key !== "Tab") return;
      const focusable = Array.from(
        el.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((node) => !node.hasAttribute("disabled"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current2 = document.activeElement;
      if (e.shiftKey) {
        if (!current2 || current2 === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (!current2 || current2 === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    el.addEventListener("keydown", onKeyDown);
    return () => {
      el.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);
  return { ref };
}
function useKeyboardNavigation(container, { selector, initialIndex = 0 }) {
  useEffect(() => {
    if (!container) return;
    const items = Array.from(container.querySelectorAll(selector));
    if (items.length === 0) return;
    items.forEach((el, i) => el.setAttribute("tabindex", i === initialIndex ? "0" : "-1"));
    function onKeyDown(e) {
      const currentIndex = items.findIndex((el) => el === document.activeElement);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        const next = items[(currentIndex + 1 + items.length) % items.length];
        items.forEach((el) => el.setAttribute("tabindex", "-1"));
        next.setAttribute("tabindex", "0");
        next.focus();
        e.preventDefault();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        const prev = items[(currentIndex - 1 + items.length) % items.length];
        items.forEach((el) => el.setAttribute("tabindex", "-1"));
        prev.setAttribute("tabindex", "0");
        prev.focus();
        e.preventDefault();
      }
    }
    container.addEventListener("keydown", onKeyDown);
    return () => container.removeEventListener("keydown", onKeyDown);
  }, [container, selector, initialIndex]);
}

export { Breadcrumb_default as Breadcrumb, ControlledZodDynamicForm, DashboardGrid, DefaultChartAdapter, TableDataCustom_default as TableDataCustom, dashboard_default as Template, generatePageNumbers, useColorMode_default as useColorMode, useFocusTrap, useKeyboardNavigation, useLiveRegion, useLocalStorage_default as useLocalStorage, useLogin_default as useLogin, usePasswordReset_default as usePasswordReset, useRegister_default as useRegister };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map