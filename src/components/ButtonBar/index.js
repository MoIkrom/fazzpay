import { useRouter } from "next/router";

export default function BottomBar() {
  const router = useRouter();

  const [selectedMenu, setMenu] = useState(router.pathname);

  const menus = [
    { name: "Dashboard", icon: "grid", destination: "/home" },
    { name: "Transfer", icon: "arrow-up", destination: "/transfer" },
    { name: "History", icon: "clock-history", destination: "/history" },
    { name: "Profile", icon: "person", destination: "/profile" },
  ];

  const handleClickMenu = (menu) => {
    setMenu(menu.destination);
    router.push(menu.destination);
  };

  return (
    <div className="container-fluid bg-white shadow px-4 py-2 d-block d-md-none fixed-bottom d-flex justify-content-between">
      {menus.map((menu) => (
        <div role="button" key={menu.name} className={`d-flex flex-column justify-content-center align-items-center ${selectedMenu === menu.destination ? "text-primary" : "text-body"}`} onClick={() => handleClickMenu(menu)}>
          <i className={`bi bi-${menu.icon} d-block fs-5`}></i>
          <p className="mb-0 fs-7">{menu.name}</p>
        </div>
      ))}
    </div>
  );
}
