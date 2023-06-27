import React from "react";
import RequestComment from "../../components/Elements/RequestComment";
function Following() {
  return (
    <div>
      <RequestComment
        isAutoCmt={true}
        name={"Duc Minh"}
        comment={"Confirm"}
        time={"at 26/May/23 12:34 PM"}
      />
      <RequestComment
        isAutoCmt={false}
        name={"Duc Minh"}
        comment={"Confirm"}
        time={"at 26/May/23 12:34 PM"}
      />
    </div>
  );
}

export default Following;
