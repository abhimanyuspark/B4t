import { useSelector } from "react-redux";
import Hr from "../../components/common/Hr";
import Tag from "../../components/common/Tag";
// import { useTranslation } from "react-i18next";
import Container from "../../components/common/Container";
import ProfilePicUpload from "../../components/@comp/ProfilePicUpload";
import {
  FaMapMarkerAlt,
  FaUserShield,
  FaSuitcase,
  FaCheckCircle,
  FaGoogle,
} from "react-icons/fa";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return null;
  }

  return (
    <Container>
      {/* Header */}
      <div className="flex items-center gap-6 sm:flex-row flex-col">
        <ProfilePicUpload file={user.profilePicture} />

        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {user.name}
            {user.isVerified && (
              <FaCheckCircle className="text-green-500" title="Verified" />
            )}
          </h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm mt-1 capitalize text-green-600">
            Status: {user.status}
          </p>
        </div>
      </div>

      {/* Divider */}
      <Hr />

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location */}
        <div className="flex gap-3">
          <FaMapMarkerAlt className="text-xl text-blue-500 mt-1" />
          <div>
            <h3 className="font-semibold">Location</h3>
            {user.location ? (
              <p className="text-gray-600">
                {user?.location?.city}, {user?.location?.country}
              </p>
            ) : (
              <p className="text-gray-600">User have no location</p>
            )}
          </div>
        </div>

        {/* Role */}
        <div className="flex gap-3">
          <FaUserShield className="text-xl text-purple-500 mt-1" />
          <div>
            <h3 className="font-semibold">Role</h3>
            <p className="capitalize text-gray-600">{user.role}</p>
          </div>
        </div>

        {/* Active Mode */}
        <div className="flex gap-3">
          <FaSuitcase className="text-xl text-orange-500 mt-1" />
          <div>
            <h3 className="font-semibold">Active Mode</h3>
            <p className="capitalize text-gray-600">
              {user.activeMode === "careSeeker" ? "Care Seeker" : "Carer"}
            </p>
          </div>
        </div>

        {/* Login Provider */}
        <div className="flex gap-3">
          <FaGoogle className="text-xl text-green-500 mt-1" />
          <div>
            <h3 className="font-semibold">Login Provider</h3>
            <p className="capitalize text-gray-600">{user.provider}</p>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Capabilities</h3>
        <div className="flex gap-3 flex-wrap">
          {user.capabilities.isCareSeeker && (
            <Tag className="bg-blue-200">Care Seeker</Tag>
          )}
          {user.capabilities.isCarer && <Tag>Carer</Tag>}
        </div>
      </div>

      {/* Travel Preferences */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Travel Preferences</h3>

        <p className="text-gray-500 text-sm">
          Trip Style:{" "}
          {user.travelPreferences.tripStyle.length
            ? user.travelPreferences.tripStyle.join(", ")
            : "Not specified"}
        </p>

        <p className="text-gray-500 text-sm mt-1">
          Interests:{" "}
          {user.travelPreferences.interests.length
            ? user.travelPreferences.interests.join(", ")
            : "Not specified"}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 text-sm text-gray-500">
        Joined on {new Date(user.createdAt).toLocaleDateString()}
      </div>
    </Container>
  );
}
