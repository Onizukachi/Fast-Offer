import React from "react";
import imgLogo from "./img/logo.svg";
import { FaTelegram, FaGithub } from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";

const Footer = () => {
  return (
    <footer className="flex w-full flex-col border-t border-divider">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-8 lg:px-8 gap-3">
        <div className="flex items-center justify-center">
          <img className="h-6 w-6 mr-2" src={imgLogo} />
          <span className="text-medium font-medium">
            Fast Offer by Alexey Glazkov
          </span>
        </div>
        <div className="flex justify-center gap-x-4">
          <a href="https://github.com/Onizukachi">
            <FaGithub />
          </a>
          <a href="https://vk.com/onizukachi">
            <SlSocialVkontakte />
          </a>
          <a href="https://t.me/onizukachi">
            <FaTelegram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer
