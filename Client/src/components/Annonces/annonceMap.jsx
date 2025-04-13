import "leaflet/dist/leaflet.css";
export default function AnnonceMap({ lat, lng }) {

    return (
        <section className="h-96 w-full overflow-hidden rounded-xl shadow-md">
            <iframe
                title="Emplacement"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
            ></iframe>
        </section>
    );
}
