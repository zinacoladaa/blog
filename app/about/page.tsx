import ScrollReveal from "../components/ScrollReveal";

export default function AboutPage() {
  return (
    <section className="px-6 py-16 max-w-2xl">
      <ScrollReveal>
        <div className="relative h-48 md:h-56 w-full max-w-md rounded-2xl overflow-hidden border-4 border-gold/60 shadow-xl mb-10">
          <img
            src="https://res.cloudinary.com/dky6bti4g/image/upload/v1783110406/smiling-family-sharing-food-at-indoor-table-2026-03-24-04-00-34-utc_2_p07uoi.jpg"
            alt="Family sharing food at the table"
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="font-display text-4xl mb-6">About Kitchen Passport</h1>
        <p className="text-parchment/80 leading-relaxed mb-4">
          Kitchen Passport is a collection of home cooking from around the world —
          the dishes that taste like somewhere, whether that's a grandmother's
          kitchen, a night market, or a rainy Tuesday that needed fixing.
        </p>
        <p className="text-parchment/80 leading-relaxed">
          Edit this page (app/about/page.tsx) to tell your own story.
        </p>
      </ScrollReveal>
    </section>
  );
}
