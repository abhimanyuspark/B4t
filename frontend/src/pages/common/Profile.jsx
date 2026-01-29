import { useSelector, useDispatch } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import Avatar from "../../components/@comp/Avatar";
import Button from "../../components/common/Button";
import Hr from "../../components/common/Hr";
import Tag from "../../components/common/Tag";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  if (!user) return null;

  const handleUpdate = () => {};

  return (
    <div className="bg-white rounded h-full p-8 shadow">
      <div className="flex items-center gap-6">
        <Avatar size="lg" />

        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <Tag>{user.role.toUpperCase()}</Tag>
        </div>
      </div>

      <Hr />

      <div className="flex justify-end">
        <Button onClick={handleUpdate} className="w-auto">
          <FaUserEdit className="text-xl" />
          {t("edit")} {t("profile.name")}
        </Button>
      </div>
    </div>
  );
}
