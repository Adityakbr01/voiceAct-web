import { company } from "@/modules/company-data";
import { PolicyLayout } from "@/modules/policy-layout";

export function CookiePolicyPage() {
  return (
    <PolicyLayout title="Cookie Policy" lastUpdated="January 1, 2024">
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">What Cookies Are</h2>
        <p className="text-muted-foreground">
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Types of Cookies We Use</h2>
        <p className="text-muted-foreground">
          We use different types of cookies for various purposes:
        </p>
        <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
          <li><strong>Session Cookies:</strong> These are temporary cookies that exist only while your browser is open. They are deleted when you close your browser.</li>
          <li><strong>Persistent Cookies:</strong> These remain until you delete them or they expire, helping us recognize your browser on return visits.</li>
          <li><strong>First-party Cookies:</strong> Set by {company.name} directly for optimal site functionality.</li>
          <li><strong>Third-party Cookies:</strong> Set by external services integrated into our website.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Analytics Cookies</h2>
        <p className="text-muted-foreground">
          These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve website performance and user experience.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Essential Cookies</h2>
        <p className="text-muted-foreground">
          These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies as the website cannot function properly without them.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Marketing Cookies</h2>
        <p className="text-muted-foreground">
          These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant content on other sites. They do not directly store personal information but uniquely identify your browser and device.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Managing Cookies</h2>
        <p className="text-muted-foreground">
          You can control and manage cookies in various ways:
        </p>
        <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
          <li>Browser Settings: Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites.</li>
          <li>Opt-out Links: For third-party cookies, you can often opt out through the respective service provider&apos;s website.</li>
          <li>Mobile Device Settings: Some mobile devices allow you to control tracking through their settings.</li>
        </ul>
        <p className="mt-4 text-muted-foreground">
          Please note that disabling certain cookies may impact the functionality of our website.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Third-party Cookies</h2>
        <p className="text-muted-foreground">
          In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site:
        </p>
        <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
          <li>Google Analytics: One of the most widespread and trusted analytics solutions. Helps us understand how you use the site and ways to improve your experience.</li>
          <li>Social Media Cookies: Allow you to share content directly on social media platforms.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
        <p className="text-muted-foreground">
          If you have any questions about our use of cookies, please contact us at {company.contact.email} or write to {company.address.full}.
        </p>
      </section>
    </PolicyLayout>
  );
}
