import { useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";
import CardUserAnnonces from "./userAnnonces.jsx";

export default function MyAnnonces() {
    const { announcements, user, setAnnouncements } = useContext(UserContext);

    const userAnnouncements = announcements.filter(
        (announcement) => announcement.proprietaire.id === user.id
    );

    const handleDelete = (id) => {
        const updatedAnnouncements = announcements.filter(announcement => announcement.id !== id);
        setAnnouncements(updatedAnnouncements);

    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">My Announcements</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userAnnouncements.map((announcement) => (
                    <CardUserAnnonces
                        key={announcement.id}
                        annonceData={announcement}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}
