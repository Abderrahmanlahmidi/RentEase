import { 
    FaHospital, 
    FaPills, 
    FaParking, 
    FaTree, 
    FaBook,
    FaBuilding 
  } from 'react-icons/fa';

const GetFacilityIcon = ({type}) => {
    switch(type) {
        case 'Hôpital public':
          return <FaHospital className="text-xl text-gray-600" />;
        case 'Pharmacie':
          return <FaPills className="text-xl text-gray-600" />;
        case 'Parking public':
          return <FaParking className="text-xl text-gray-600" />;
        case 'Parc public':
          return <FaTree className="text-xl text-gray-600" />;
        case 'Bibliothèque publique':
          return <FaBook className="text-xl text-gray-600" />;
        default:
          return <FaBuilding className="text-xl text-gray-600" />;
      }
}
 
export default GetFacilityIcon;