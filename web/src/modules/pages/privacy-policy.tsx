import { company } from "@/modules/company-data";
import { PolicyLayout } from "@/modules/policy-layout";

export function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="January 1, 2024">
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Introduction</h2>
        <p className="text-muted-foreground">
          {company.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to
          protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our website and use our services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Information We Collect</h2>
        <p className="text-muted-foreground">
          We may collect information about you in various ways, including:
        </p>
        <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
          <li>
            Personal Data: Name, email address, phone number, and company information submitted
            through contact forms.
          </li>
          <li>
            Usage Data: IP address, browser type, pages visited, time spent on pages, and other
            diagnostic data.
          </li>
          <li>Cookies: Information stored on your device when you visit our website.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">How We Use Information</h2>
        <p className="text-muted-foreground">
          We use the collected information for purposes including:
        </p>
        <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
          <li>Providing and maintaining our services.</li>
          <li>Responding to your inquiries and communications.</li>
          <li>Improving our website and services.</li>
          <li>Sending periodic emails regarding our services or other information.</li>
          <li>Complying with legal obligations.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Cookies</h2>
        <p className="text-muted-foreground">
          We use cookies to enhance your experience on our website. You can instruct your browser to
          refuse all cookies or to indicate when a cookie is being sent. For more details, please
          refer to our Cookie Policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          We may use third-party analytics services to monitor and analyze the use of our website.
          These services may collect information sent by your browser as part of a web page request.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Third-party Services</h2>
        <p className="text-muted-foreground">
          We may employ third-party companies and individuals to facilitate our services, provide
          services on our behalf, or perform service-related tasks. These third parties have access
          to your personal information only to perform these tasks on our behalf and are obligated
          not to disclose or use it for any other purpose.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Data Security</h2>
        <p className="text-muted-foreground">
          We implement appropriate technical and organizational measures to protect your personal
          information against unauthorized access, alteration, disclosure, or destruction. However,
          no method of transmission over the Internet is 100% secure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Data Retention</h2>
        <p className="text-muted-foreground">
          We will retain your personal information only for as long as necessary for the purposes
          outlined in this Privacy Policy. We will retain and use your data to the extent necessary
          to comply with our legal obligations, resolve disputes, and enforce our policies.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Children&apos;s Privacy</h2>
        <p className="text-muted-foreground">
          Our services are not directed to individuals under the age of 18. We do not knowingly
          collect personal information from children under 18. If we become aware that we have
          collected personal data from a child under 18, we will take steps to delete that
          information.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">International Transfers</h2>
        <p className="text-muted-foreground">
          Your information may be transferred to and maintained on servers located outside of your
          state, province, country, or other governmental jurisdiction where data protection laws
          may differ. If you are located outside India, please be aware that any information you
          provide will be transferred to and processed in India.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Your Rights</h2>
        <p className="text-muted-foreground">You have the right to:</p>
        <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
          <li>Access the personal information we hold about you.</li>
          <li>Request correction of inaccurate personal information.</li>
          <li>Request deletion of your personal information.</li>
          <li>Object to processing of your personal information.</li>
          <li>Request restriction of processing.</li>
          <li>Request transfer of your personal information.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Contact Information</h2>
        <p className="text-muted-foreground">
          If you have questions about this Privacy Policy, please contact us at{" "}
          {company.contact.email}.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Policy Updates</h2>
        <p className="text-muted-foreground">
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot;
          date. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </section>
    </PolicyLayout>
  );
}
