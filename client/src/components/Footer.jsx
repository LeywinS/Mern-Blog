import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

export default function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Backs
              </span>{" "}
              Blog
            </Link>
          </div>

          <div className="grid grid-col-2 mt-4 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="/" target="_blank" rel="noopener noreferrer">
                  My other project
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/LeywinS"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://discord.com/channels/leywi_"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title=" legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/LeywinS">
                  Terms &amp; Conditions
                </Footer.Link>
                <Footer.Link href="https://discord.com/channels/leywi_">
                  Privacy Policy
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Backs Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-32 sm:justify-center ">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsDribbble} />
            <Footer.Icon href="https://github.com/LeywinS" icon={BsGithub} />
            <Footer.Icon href="#" target="_blank" icon={BsTwitterX} />
            <Footer.Icon href="#" icon={BsInstagram} target="_blank" />
          </div>
        </div>
      </div>
    </Footer>
  );
}
