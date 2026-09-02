import { company } from "@/modules/company-data";
import { PolicyLayout } from "@/modules/policy-layout";

export function TermsPage() {
  return (
    <PolicyLayout title="Terms & Conditions" lastUpdated="January 1, 2024">
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Acceptance of Terms</h2>
        <p className="text-muted-foreground">
          By accessing and using the services provided by {company.name} (&quot;we,&quot;
          &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms and Conditions.
          If you do not agree to these terms, please do not use our services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
        <p className="text-muted-foreground">
          We provide software development services including but not limited to web development,
          mobile app development, UI/UX design, cloud solutions, and consulting. The scope,
          deliverables, and timeline for each project will be defined in a separate Statement of
          Work (SOW) or project agreement.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Client Responsibilities</h2>
        <p className="text-muted-foreground">The client agrees to:</p>
        <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
          <li>Provide timely access to necessary resources, information, and personnel.</li>
          <li>Respond to queries and feedback within a reasonable timeframe.</li>
          <li>Ensure that content provided does not infringe upon any third-party rights.</li>
          <li>Designate a primary point of contact for project communications.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Payments</h2>
        <p className="text-muted-foreground">
          Payment terms will be specified in the project agreement. Unless otherwise agreed:
        </p>
        <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
          <li>Invoices are payable within 15 days of issue.</li>
          <li>Late payments may incur a 1.5% monthly interest charge.</li>
          <li>All quoted prices are exclusive of applicable taxes unless stated otherwise.</li>
          <li>Work may be paused for accounts outstanding beyond 30 days.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Refund Policy</h2>
        <p className="text-muted-foreground">Refund eligibility depends on the project stage:</p>
        <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
          <li>Before project commencement: Full refund minus administrative fees.</li>
          <li>During discovery/design phase: Pro-rata refund based on work completed.</li>
          <li>
            During development phase: Refund calculated based on remaining undelivered milestones.
          </li>
          <li>After delivery: No refund for completed and accepted deliverables.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Project Delivery</h2>
        <p className="text-muted-foreground">
          We strive to deliver projects within the agreed timeline. However, timelines may be
          adjusted due to:
        </p>
        <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
          <li>Changes in project scope or requirements.</li>
          <li>Delayed client feedback or approvals.</li>
          <li>Force majeure events beyond reasonable control.</li>
          <li>Technical complexities not identified during discovery.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Intellectual Property</h2>
        <p className="text-muted-foreground">
          Upon full payment, the client receives ownership of all custom code, designs, and
          deliverables created specifically for the project. {company.name} retains the right to use
          general knowledge, skills, tools, and pre-existing components in future projects.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Confidentiality</h2>
        <p className="text-muted-foreground">
          Both parties agree to keep confidential all proprietary information shared during the
          course of the engagement. This obligation survives the termination of the agreement for a
          period of two years.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Limitation of Liability</h2>
        <p className="text-muted-foreground">
          To the maximum extent permitted by applicable law, {company.name} shall not be liable for
          any indirect, incidental, special, consequential, or punitive damages. Our total liability
          shall not exceed the total amount paid by the client under the applicable project
          agreement.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Termination</h2>
        <p className="text-muted-foreground">
          Either party may terminate the agreement with 14 days&apos; written notice. In the event
          of termination, the client shall pay for all work completed up to the termination date.
          Provisions that by their nature should survive termination shall remain in effect.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Governing Law</h2>
        <p className="text-muted-foreground">
          These Terms and Conditions shall be governed by and construed in accordance with the laws
          of India. Any disputes arising under these terms shall be subject to the exclusive
          jurisdiction of the courts in India.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Dispute Resolution</h2>
        <p className="text-muted-foreground">
          Any disputes arising out of or relating to these terms shall first be attempted to be
          resolved through good-faith negotiation. If the dispute cannot be resolved through
          negotiation within 30 days, either party may submit the dispute to binding arbitration
          under the Arbitration and Conciliation Act, 1996.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Contact Information</h2>
        <p className="text-muted-foreground">
          For questions regarding these Terms & Conditions, please contact {company.name} at{" "}
          {company.contact.email}.
        </p>
      </section>
    </PolicyLayout>
  );
}
