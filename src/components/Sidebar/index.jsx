import { useEffect, useRef } from "react";
import Logo from "../Logo";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import ThemeToggle from "../ThemeToggle";
import { menuData } from "../Menu/menuData";
import "./index.css";

const Sidebar = ({ hideable = true }) => {
  const touchAreaRef = useRef();
  const sidebarRef = useRef();
  const previousTouchOffsetX = useRef(0);
  const touchOffsetX = useRef(0);

  const moveSidebar = (sidebar, event) => {
    const style = getComputedStyle(sidebar);
    const matrix = new DOMMatrix(style.transform);

    previousTouchOffsetX.current = touchOffsetX.current;
    touchOffsetX.current = event.targetTouches[0]?.clientX;

    if (
      matrix.m41 < -1 &&
      previousTouchOffsetX.current <= touchOffsetX.current
    ) {
      sidebar.style.transform = `translateX(${
        matrix.m41 + touchOffsetX.current * 0.05
      }px)`;
    } else if (
      matrix.m41 > -67 &&
      previousTouchOffsetX.current > touchOffsetX.current
    ) {
      sidebar.style.transform = `translateX(${
        matrix.m41 - touchOffsetX.current * 0.05
      }px)`;
    }
  };

  const handleCancel = (sidebar) => {
    const style = getComputedStyle(sidebar);
    const matrix = new DOMMatrix(style.transform);
    console.log("d");
    if (matrix.m41 > 0) sidebar.style.transform = "none";
  };

  useEffect(() => {
    touchAreaRef.current.addEventListener("touchmove", (event) =>
      moveSidebar(sidebarRef.current, event)
    );

    touchAreaRef.current.addEventListener(
      "touchend",
      handleCancel(sidebarRef.current)
    );
  }, []);

  return (
    <>
      {hideable && <div className="touch-area" ref={touchAreaRef}></div>}
      <aside className="sidebar" ref={sidebarRef}>
        <Logo />
        <Menu>
          {menuData.map((item) => (
            <MenuItem key={item.text} text={item.text} icon={item.icon} />
          ))}
        </Menu>
        <ThemeToggle />
      </aside>
    </>
  );
};

export default Sidebar;
