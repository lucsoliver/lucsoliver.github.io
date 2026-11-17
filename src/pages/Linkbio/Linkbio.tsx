import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LinksBackground from "../../components/illustrations/LinksBackground";
import Tooltip from "../../components/Tooltip/Tooltip";
import { socialLinks } from "../../data/socials";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import styles from "./Linkbio.module.css";

const cvPdf = "/docs/CV_Lucas_Oliveira_Novembro2026.pdf";
const cvPdfEN = "/docs/CV_Lucas_Oliveira_October2026.pdf";

function Links() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { status, copy } = useCopyToClipboard();
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const handleCopy = async (label: string, text: string) => {
    setCopiedLabel(label);
    await copy(text);
  };

  return (
    <div className={styles.page}>
      <LinksBackground />

      <main className={styles.linkSection}>
        <img
          src="https://github.com/lucsoliver.png"
          alt="Lucas Oliveira"
          className={styles.avatar}
          width={192}
          height={192}
          loading="lazy"
          decoding="async"
          draggable="false"
        />
        <h2 className={styles.titleName}>
          <span className="stylizedName">Lucas Oliveira</span>
        </h2>
        <span className={styles.dev}>{t("links.dev")}</span>
        <span className={styles.stack}>{t("links.stack")}</span>
        <div className={styles.socialsContainer}>
          {socialLinks.map((project) => {
            const Icon = project.icon;
            const socialContent = (
              <>
                <Icon className={styles.icon} aria-hidden="true" />
                <span className={styles.label}>{project.label}</span>
              </>
            );

            if (project.copyText) {
              const isActive =
                copiedLabel === project.label && status !== "idle";
              const isCopied = isActive && status === "copied";
              const isError = isActive && status === "error";

              const label = isCopied
                ? t("links.copied", { defaultValue: "Copiado!" })
                : isError
                  ? t("links.copyFailed", {
                      defaultValue: "Não foi possível copiar",
                    })
                  : project.label;

              return (
                <Tooltip
                  key={project.label}
                  label={label}
                  background={
                    isCopied ? "#22c55e" : isError ? "#ef4444" : undefined
                  }
                  open={isActive ? true : undefined}
                  position="bottom"
                  showArrow={false}
                >
                  <button
                    type="button"
                    className={styles.linkIconButton}
                    aria-label={project.label}
                    draggable="false"
                    onClick={() => handleCopy(project.label, project.copyText!)}
                  >
                    {socialContent}
                  </button>
                </Tooltip>
              );
            }

            return (
              <Tooltip
                key={project.href}
                label={project.label}
                position="bottom"
                showArrow={false}
              >
                <a
                  href={project.href}
                  rel={project.rel}
                  target="_blank"
                  className={styles.linkIcon}
                  aria-label={project.label}
                  draggable="false"
                >
                  {socialContent}
                </a>
              </Tooltip>
            );
          })}
        </div>

        <div className={styles.linksList}>
          <button
            type="button"
            onClick={() => navigate("/")}
            className={`${styles.linkItem} ${styles.linkItemWebsite}`}
            draggable="false"
          >
            <div className={styles.linkBox}>
              <span className={styles.linkTitle}>{t("links.website")}</span>
            </div>
          </button>
          <a
            href={cvPdf}
            target="_blank"
            rel="me noopener"
            className={styles.linkItem}
            draggable="false"
          >
            <div className={styles.linkBox}>
              <span className={styles.linkTitle}>{t("links.cvpt")}</span>
            </div>
          </a>
          <a
            href={cvPdfEN}
            target="_blank"
            rel="me noopener"
            className={styles.linkItem}
            draggable="false"
          >
            <div className={styles.linkBox}>
              <span className={styles.linkTitle}>{t("links.cven")}</span>
            </div>
          </a>
          <a
            href="mailto:lucasolv.dev@gmail.com"
            rel="nofollow"
            className={styles.linkItem}
            draggable="false"
          >
            <div className={styles.linkBox}>
              <span className={styles.linkTitle}>{t("links.email")}</span>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}

export default Links;
