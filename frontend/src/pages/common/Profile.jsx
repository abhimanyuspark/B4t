import { useSelector, useDispatch } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import Avatar from "../../components/@comp/Avatar";
import Button from "../../components/common/Button";
import Hr from "../../components/common/Hr";
import Tag from "../../components/common/Tag";
import { useTranslation } from "react-i18next";
import Container from "../../components/common/Container";
import ProfilePicUpload from "../../components/@comp/ProfilePicUpload";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  if (!user) return null;

  // const handleUpdate = () => {};

  return (
    <Container>
      <div className="flex items-center gap-6 sm:flex-row flex-col">
        <ProfilePicUpload file={user?.profilePicture} />

        <div className="flex gap-2 flex-col items-start">
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 text-xl">{user.email}</p>
          <Tag>{user.role.toUpperCase()}</Tag>
        </div>
      </div>

      {/* <Hr /> */}

      {/* <div className="flex justify-end">
        <Button onClick={handleUpdate} className="w-auto">
          <FaUserEdit className="text-xl" />
          {t("common.edit")} {t("profile.title")}
        </Button>
      </div> */}
    </Container>
  );
}
