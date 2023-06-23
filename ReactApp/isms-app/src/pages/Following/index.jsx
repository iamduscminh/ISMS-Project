import React from "react";
import Dropdown from "../../components/Elements/Dropdown";
function Following() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleMenuOne = () => {
    // do something
    setOpen(false);
    console.log("clicked one");
  };

  const handleMenuTwo = () => {
    // do something
    setOpen(false);
    console.log("clicked two");
  };
  return (
    <div>
      <Dropdown
        open={open}
        trigger={<button onClick={handleOpen}>Dropdown</button>}
        menu={[
          <button onClick={handleMenuOne}>Menu 1</button>,
          <button onClick={handleMenuTwo}>Menu 2</button>,
        ]}
      />
    </div>
  );
}

export default Following;
