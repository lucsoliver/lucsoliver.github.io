import { Copy, Check, X } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

import Tooltip from "../../Tooltip/Tooltip";
import { useCopyToClipboard } from "../../../hooks/useCopyToClipboard";
import styles from "./Contact.module.css";

const emailAddress = "lucasolv.dev@gmail.com";

const contactMethods = [
  {
    href: "https://www.linkedin.com/in/lucas-oliveira-paula",
    icon: FaLinkedinIn,
    value: "LinkedIn",
    rel: "noopener noreferrer",
  },
];

function Contact() {
  const { t } = useTranslation();
  const { status, copy } = useCopyToClipboard();

  const isCopied = status === "copied";
  const isError = status === "error";

  const tooltipLabel = isCopied
    ? t("contact.emailCopied")
    : isError
      ? t("contact.copyFailed", { defaultValue: "Não foi possível copiar" })
      : t("contact.copyEmail");

  const tooltipBackground = isCopied
    ? "#22c55e"
    : isError
      ? "#ef4444"
      : undefined;

  const StatusIcon = isCopied ? Check : isError ? X : Copy;

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <span className={styles.subtitle}>{t("contact.subtitle")}</span>
        <h2 className={styles.title}>{t("contact.title")}</h2>

        <div className={styles.contactBar}>
          <div className={styles.contactItemWrap}>
            <Tooltip
              label={tooltipLabel}
              background={tooltipBackground}
              size="md"
              open={status !== "idle" ? true : undefined}
            >
              <button
                type="button"
                className={`${styles.emailCopyButton} ${
                  isCopied ? styles.emailCopyButtonActive : ""
                }`}
                onClick={() => copy(emailAddress)}
                aria-label={`${t("contact.copyEmail")}: ${emailAddress}`}
              >
                <StatusIcon
                  className={`${styles.icon} ${isCopied ? styles.iconActive : ""}`}
                  aria-hidden="true"
                />
              </button>
            </Tooltip>

            <a
              href={`mailto:${emailAddress}`}
              rel="nofollow"
              className={styles.contactItem}
              draggable="false"
            >
              <span className={`${styles.contactValue} desktopNavBar`}>
                {emailAddress}
              </span>
            </a>
          </div>

          {contactMethods.map(({ href, icon: Icon, value, rel }) => (
            <a
              key={href}
              href={href}
              rel={rel}
              target="_blank"
              className={`${styles.contactItem} ${styles.hiddenMobile}`}
              draggable="false"
            >
              <Icon className={styles.icon} aria-hidden="true" />

              <span className={`${styles.contactValue} desktopNavBar`}>
                {value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
