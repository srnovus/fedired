import * as nodemailer from "nodemailer";
import { fetchMeta } from "backend-rs";
import Logger from "@/services/logger.js";
import { config } from "@/config.js";
import { inspect } from "node:util";

export const logger = new Logger("email");

export async function sendEmail(
	to: string,
	subject: string,
	html: string,
	text: string,
) {
	const instanceMeta = await fetchMeta();

	const iconUrl = `${config.url}/static-assets/mi-white.png`;
	const emailSettingUrl = `${config.url}/settings/email`;

	const enableAuth =
		instanceMeta.smtpUser != null && instanceMeta.smtpUser !== "";

	const transporter = nodemailer.createTransport({
		host: instanceMeta.smtpHost,
		port: instanceMeta.smtpPort,
		secure: instanceMeta.smtpSecure,
		ignoreTLS: !enableAuth,
		proxy: config.proxySmtp,
		auth: enableAuth
			? {
					user: instanceMeta.smtpUser,
					pass: instanceMeta.smtpPass,
				}
			: undefined,
	} as any);

	try {
		const info = await transporter.sendMail({
			from: instanceMeta.email!,
			to: to,
			subject: subject,
			text: text,
			html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${subject}</title>
    <style>
      /* General Styles */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        background-color: #161620; /* bg */
        color: #BAD5FA; /* fg */
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        padding: 20px;
      }

      main {
        max-width: 600px;
        margin: 0 auto;
        background-color: #1d1d27; /* panel */
        border-radius: 16px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5); /* shadow */
        overflow: hidden;
      }

      /* Header Styles */
      header {
        background-color: #858AFA; /* accent */
        color: #1e1e2e; /* fgOnAccent */
        padding: 24px;
        display: flex;
        align-items: center;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1); /* divider */
      }

      header img {
        max-width: 80px;
        margin-right: 16px;
        border-radius: 8px;
      }

      header h1 {
        font-size: 1.8rem;
        font-weight: 600;
      }

      /* Article Styles */
      article {
        padding: 32px;
      }

      article h1 {
        font-size: 1.5rem;
        color: #f38ba8; /* error */
        margin-bottom: 16px;
        font-weight: 700;
      }

      article p {
        margin-bottom: 16px;
        color: #bac2de; /* cwFg */
      }

      article a {
        color: #6364FF; /* link */
        text-decoration: none;
      }

      article a:hover {
        text-decoration: underline;
      }

      /* Footer Styles */
      footer {
        background-color: #313244; /* infoBg */
        color: #a6adc8; /* infoFg */
        text-align: center;
        padding: 20px;
        font-size: 0.9rem;
        border-top: 2px solid rgba(255, 255, 255, 0.1); /* divider */
      }

      footer a {
        color: #74c7ec; /* hashtag */
        text-decoration: none;
      }

      footer a:hover {
        text-decoration: underline;
      }

      /* Navigation Styles */
      nav {
        text-align: center;
        margin-top: 16px;
      }

      nav a {
        color: #6364FF; /* link */
        text-decoration: none;
        font-weight: 500;
      }

      nav a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <img
          src="${instanceMeta.logoImageUrl || instanceMeta.iconUrl || iconUrl}"
          alt="Logo"
        />
        <h1>${instanceMeta.name}</h1>
      </header>
      <article>
        <h1>${subject}</h1>
        <p>${html}</p>
      </article>
      <footer>
        <p>
Gestiona tus preferencias en tu
<a href="${emailSettingUrl}">configuración de correo electrónico</a>.
        </p>
      </footer>
    </main>
    <nav>
      <a href="${config.url}">${config.host}</a>
    </nav>
  </body>
</html>
`,
		});

		logger.info(`Message sent: ${info.messageId}`);
	} catch (err) {
		logger.error(inspect(err));
		throw err;
	}
}
