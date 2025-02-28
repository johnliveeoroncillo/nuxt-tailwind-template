import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';
import fs from 'fs';

// Define an interface for email options
interface EmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
    from?: string;
    cc?: string | string[];
    bcc?: string | string[];
    attachments?: { filename: string; content: string | Buffer }[];
    data?: Record<string, any>;
}

export type TemplatedEmailOptions = Omit<EmailOptions, 'html' | 'text'>;

// Define a helper type to create the dynamic enum from the filenames
type Templates = 'welcome';

// Define a static Email class
export class Email {
    private static transporter: nodemailer.Transporter;
    private static templatesDir = path.join(process.cwd(), 'server', 'email');

    constructor() {
        console.log('constructor loaded');
    }

    /**
     * Initializes the email transporter with the given SMTP credentials.
     */
    static initialize(): void {
        const host = process.env.SMTP_HOST;
        const port = parseInt(process.env.SMTP_PORT ?? '465');
        const username = process.env.SMTP_USERNAME;
        const password = process.env.SMTP_PASSWORD;
        const from = process.env.SMTP_FROM;

        if (!host || !port || !username || !password || !from) {
            console.error('Missing SMTP configuration parameters');
            return;
        }

        Email.transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465, // Use secure connection if port is 465
            auth: {
                user: username,
                pass: password,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    static async test() {
        Email.transporter.verify((error: Error | null) => {
            if (error) {
                console.error('Error connecting to email server:', error);
            } else {
                console.log('Email server connection successful.');
            }
        });
    }

    /**
     * Sends an email with the specified options.
      * @param options The email options.
      * @returns A promise that resolves when the email is sent successfully.
      * @throws Error if the transporter is not initialized or if there is an error sending the email.
      */
    static async send(options: EmailOptions): Promise<void> {
        Email.initialize();

        if (!Email.transporter) {
            throw new Error('Email transporter not initialized. Call Email.initialize() first.');
        }
        if(!options.from) {
            options.from = process.env?.SMTP_FROM ?? 'test@jlocodes.com';
        }
    
        try {
            const info = await Email.transporter.sendMail({
                from: options.from,
                to: options.to,
                subject: options.subject,
                html: options.html,
                text: options.text,
                cc: options.cc,
                bcc: options.bcc,
                attachments: options.attachments,
            });

            console.log('Email sent:', info.messageId);
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }

    /**
     * Sends an email using an EJS template.
     * @param templateName The name of the EJS template file (without .ejs extension).
     * @param options The email options, including template data.
     * @throws Error if the template file is not found or if there is an error rendering the template or sending the email.
     */
    static async sendTemplated(templateName: Templates, options: TemplatedEmailOptions): Promise<void> {
        const templatePath = path.join(Email.templatesDir, `${templateName}.ejs`);

        try {
            const templateContent = fs.readFileSync(templatePath, 'utf-8');
            const html = ejs.render(templateContent, options.data);

            await Email.send({
                ...options,
                html, // Override html with the rendered template
            });
        } catch (error) {
            if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
                console.error(`Template file not found: ${templatePath}`);
                throw new Error(`Template file not found: ${templateName}`);
            }
            console.error('Error sending templated email:', error);
            throw error;
        }
    }
}
