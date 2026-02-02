import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatchingCarers } from "../../../redux/features/carerAvailabilitySlice";
import Select from "../../../components/common/Select";
import { toast } from "react-hot-toast";

export default function MatchingCarers({ travelPlan }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { list, loading } = useSelector((state) => state.carerAvailability);

  useEffect(() => {
    if (!travelPlan) return;

    dispatch(getMatchingCarers(travelPlan?._id));
  }, [travelPlan, dispatch]);

  const onChange = (e) => {
    // toast.promise()
    setUser(e);
  };

  if (loading) return <p>Loading carers...</p>;

  return (
    <div>
      <Select
        value={user}
        onChange={onChange}
        text={(t) => t?.carerId?.name}
        options={list}
      />
    </div>
  );
}
