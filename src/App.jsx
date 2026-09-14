import { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Cushion Foundation",
    thaiName: "คุชชั่นรองพื้น",
    category: "เครื่องสำอาง",
    price: 359,
    image: "/images/1cushion.png",
    description:
      "คุชชั่นเนื้อบางเบา ช่วยให้ผิวดูเรียบเนียนเป็นธรรมชาติ เหมาะสำหรับการแต่งหน้าในชีวิตประจำวัน",
  },
  {
    id: 2,
    name: "Lip Tint",
    thaiName: "ลิปทินต์",
    category: "เครื่องสำอาง",
    price: 189,
    image: "/images/2liptint.png",
    description:
      "ลิปทินต์สีสวย เนื้อบางเบา เกลี่ยง่าย เหมาะสำหรับเพิ่มสีสันให้ริมฝีปาก",
  },
  {
    id: 3,
    name: "Face Powder",
    thaiName: "แป้งฝุ่น",
    category: "เครื่องสำอาง",
    price: 259,
    image: "/images/3powder.png",
    description:
      "แป้งฝุ่นเนื้อละเอียด ช่วยให้ผิวดูเรียบเนียนและช่วยลดความมันระหว่างวัน",
  },
  {
    id: 4,
    name: "Facial Serum",
    thaiName: "เซรั่มบำรุงผิวหน้า",
    category: "บำรุงผิวหน้า",
    price: 399,
    image: "/images/4serum.png",
    description:
      "เซรั่มบำรุงผิวหน้าเนื้อบางเบา ช่วยเพิ่มความชุ่มชื้นให้กับผิว",
  },
  {
    id: 5,
    name: "Face Cream",
    thaiName: "ครีมบำรุงผิวหน้า",
    category: "บำรุงผิวหน้า",
    price: 329,
    image: "/images/5cream.png",
    description:
      "ครีมบำรุงผิวหน้าช่วยเพิ่มความชุ่มชื้นและทำให้ผิวรู้สึกนุ่มขึ้น",
  },
  {
    id: 6,
    name: "Facial Sunscreen",
    thaiName: "ครีมกันแดดผิวหน้า",
    category: "บำรุงผิวหน้า",
    price: 289,
    image: "/images/6fsun.png",
    description:
      "ผลิตภัณฑ์กันแดดสำหรับผิวหน้า เนื้อบางเบา เหมาะสำหรับใช้ในตอนเช้า",
  },
  {
    id: 7,
    name: "Body Lotion",
    thaiName: "โลชั่นบำรุงผิวกาย",
    category: "บำรุงผิวกาย",
    price: 249,
    image: "/images/7lotion.png",
    description:
      "โลชั่นบำรุงผิวกาย ช่วยเพิ่มความชุ่มชื้นและดูแลผิวเป็นประจำทุกวัน",
  },
  {
    id: 8,
    name: "Body Soap",
    thaiName: "สบู่ทำความสะอาดผิว",
    category: "บำรุงผิวกาย",
    price: 129,
    image: "/images/8soap.png",
    description:
      "สบู่สำหรับทำความสะอาดผิวกาย ช่วยให้รู้สึกสะอาดและสดชื่น",
  },
  {
    id: 9,
    name: "Body Scrub",
    thaiName: "สครับผิวกาย",
    category: "บำรุงผิวกาย",
    price: 219,
    image: "/images/9bscrub.png",
    description:
      "ผลิตภัณฑ์สครับผิวกาย ช่วยทำความสะอาดและดูแลผิวอย่างอ่อนโยน",
  },
  {
    id: 10,
    name: "Hand Cream",
    thaiName: "ครีมบำรุงมือ",
    category: "บำรุงผิวกาย",
    price: 159,
    image: "/images/10handcream.png",
    description:
      "ครีมบำรุงมือ ช่วยเพิ่มความชุ่มชื้นให้ผิวบริเวณมือ",
  },
  {
    id: 11,
    name: "Body Sunscreen",
    thaiName: "ครีมกันแดดผิวกาย",
    category: "บำรุงผิวกาย",
    price: 299,
    image: "/images/11bsun.png",
    description:
      "ผลิตภัณฑ์กันแดดสำหรับผิวกาย เหมาะสำหรับใช้ก่อนออกจากบ้าน",
  },
  {
    id: 12,
    name: "Body Oil",
    thaiName: "ออยล์บำรุงผิวกาย",
    category: "บำรุงผิวกาย",
    price: 349,
    image: "/images/12bodyoil.png",
    description:
      "ออยล์สำหรับบำรุงผิวกาย ช่วยให้ผิวรู้สึกนุ่มและชุ่มชื้น",
  },
  {
    id: 13,
    name: "Hair Shampoo",
    thaiName: "แชมพูสระผม",
    category: "ดูแลเส้นผม",
    price: 269,
    image: "/images/13shampoo.png",
    description:
      "แชมพูสำหรับทำความสะอาดเส้นผมและหนังศีรษะ",
  },
  {
    id: 14,
    name: "Hair Conditioner",
    thaiName: "ครีมนวดผม",
    category: "ดูแลเส้นผม",
    price: 269,
    image: "/images/14con.png",
    description:
      "ครีมนวดสำหรับบำรุงเส้นผมหลังสระ ช่วยให้ผมนุ่มและจัดทรงง่าย",
  },
  {
    id: 15,
    name: "Hair Treatment",
    thaiName: "ทรีตเมนต์บำรุงผม",
    category: "ดูแลเส้นผม",
    price: 329,
    image: "/images/15treatment.png",
    description:
      "ทรีตเมนต์สำหรับบำรุงเส้นผมและเพิ่มความชุ่มชื้น",
  },
  {
    id: 16,
    name: "Hair Serum",
    thaiName: "เซรั่มบำรุงเส้นผม",
    category: "ดูแลเส้นผม",
    price: 299,
    image: "/images/16hserum.png",
    description:
      "เซรั่มบำรุงเส้นผม เหมาะสำหรับดูแลปลายผมและลดความแห้ง",
  },
  {
    id: 17,
    name: "Hair Spray",
    thaiName: "สเปรย์บำรุงเส้นผม",
    category: "ดูแลเส้นผม",
    price: 249,
    image: "/images/17hspray.png",
    description:
      "สเปรย์สำหรับดูแลเส้นผม ใช้งานง่ายและเหมาะสำหรับใช้ระหว่างวัน",
  },
  {
    id: 18,
    name: "Hair Mask",
    thaiName: "มาสก์บำรุงเส้นผม",
    category: "ดูแลเส้นผม",
    price: 359,
    image: "/images/18mask.png",
    description:
      "มาสก์สำหรับบำรุงเส้นผม ช่วยให้เส้นผมรู้สึกนุ่มและได้รับการบำรุง",
  },
];

const categories = [
  "สินค้าทั้งหมด",
  "เครื่องสำอาง",
  "บำรุงผิวหน้า",
  "บำรุงผิวกาย",
  "ดูแลเส้นผม",
];

function App() {
  const [selectedCategory, setSelectedCategory] =
    useState("สินค้าทั้งหมด");

  const [search, setSearch] = useState("");

  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const [showRegister, setShowRegister] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showCheckout, setShowCheckout] = useState(false);

  const [orderSuccess, setOrderSuccess] = useState(false);

  const [user, setUser] = useState(null);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
  const loadUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setUser(session?.user ?? null);
  };

  loadUser();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "สินค้าทั้งหมด" ||
        product.category === selectedCategory;

      const text = search.toLowerCase();

      const searchMatch =
        product.name.toLowerCase().includes(text) ||
        product.thaiName.toLowerCase().includes(text) ||
        product.category.toLowerCase().includes(text);

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search]);

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addToCart = (product) => {
    setCart((currentCart) => {
      const found = currentCart.find(
        (item) => item.id === product.id
      );

      if (found) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setSelectedProduct(null);
    setShowCart(true);
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const openLogin = () => {
    setShowCart(false);
    setShowRegister(false);
    setShowLogin(true);
  };

  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (
      registerData.password !==
      registerData.confirmPassword
    ) {
      alert("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    if (registerData.password.length < 6) {
      alert("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    const { data, error } =
      await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
        options: {
          data: {
            full_name: registerData.fullName,
            phone: registerData.phone,
          },
        },
      });

    if (error) {
      alert(
        "สมัครสมาชิกไม่สำเร็จ: " +
          error.message
      );
      return;
    }

    alert("สมัครสมาชิกสำเร็จ");

    setUser(data.user);

    setRegisterData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    setShowRegister(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

    if (error) {
      alert(
        "เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบอีเมลและรหัสผ่าน"
      );
      return;
    }

    setUser(data.user);

    setLoginData({
      email: "",
      password: "",
    });

    setShowLogin(false);

    alert("เข้าสู่ระบบสำเร็จ");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();

    setUser(null);

    alert("ออกจากระบบเรียบร้อย");
  };

  const startCheckout = () => {
  if (cart.length === 0) {
    return;
  }

  if (!user) {
    alert("กรุณาสมัครสมาชิกหรือเข้าสู่ระบบก่อนสั่งซื้อสินค้า");

    setShowCart(false);
    setShowLogin(true);

    return;
  }

  setShowCart(false);
  setShowCheckout(true);
};

  const finishOrder = (event) => {
    event.preventDefault();

    setShowCheckout(false);
    setOrderSuccess(true);
    setCart([]);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <h1>AE’S STORE</h1>
            <p>BEAUTY & COSMETICS</p>
          </div>

          <div className="header-actions">
            {user ? (
              <>
                <button className="top-button">
                  👤{" "}
                  {user.user_metadata?.full_name ||
                    "สมาชิก"}
                </button>

                <button
                  className="top-button"
                  onClick={handleLogout}
                >
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <button
                className="top-button"
                onClick={openLogin}
              >
                👤 เข้าสู่ระบบ
              </button>
            )}

            <button
              className="top-button"
              onClick={() => setShowCart(true)}
            >
              🛒 ตะกร้า ({cartCount})
            </button>
          </div>
        </div>

        <div className="search-wrapper">
          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <button className="search-button">
            🔍
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="hero-small">
              WELCOME TO AE’S STORE
            </p>

            <h2>
              เติมความมั่นใจ
              <br />
              ให้ทุกวันของคุณ
            </h2>

            <p className="hero-description">
              เลือกซื้อผลิตภัณฑ์เครื่องสำอาง
              ผลิตภัณฑ์บำรุงผิว
              และผลิตภัณฑ์ดูแลเส้นผมที่คุณชื่นชอบ
            </p>

            <button
              className="gold-button"
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              เลือกซื้อสินค้า
            </button>
          </div>

          <div className="hero-card">
            <div className="hero-circle">
              AE
            </div>

            <p>BEAUTY FOR EVERY DAY</p>
          </div>
        </section>

        <section className="category-section">
          <div className="section-title">
            <p>SHOP BY CATEGORY</p>
            <h2>หมวดหมู่สินค้า</h2>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-card active"
                    : "category-card"
                }
                onClick={() =>
                  setSelectedCategory(category)
                }
              >
                <span>
                  {category ===
                  "สินค้าทั้งหมด"
                    ? "🛍️"
                    : category ===
                      "เครื่องสำอาง"
                    ? "💄"
                    : category ===
                      "บำรุงผิวหน้า"
                    ? "✨"
                    : category ===
                      "บำรุงผิวกาย"
                    ? "🧴"
                    : "💆"}
                </span>

                {category}
              </button>
            ))}
          </div>
        </section>

        <section
          className="products-section"
          id="products"
        >
          <div className="section-title">
            <p>OUR PRODUCTS</p>
            <h2>{selectedCategory}</h2>
          </div>

          <div className="product-grid">
            {filteredProducts.map(
              (product) => (
                <article
                  className="product-card"
                  key={product.id}
                >
                  <div
                    className="product-image-box"
                    onClick={() =>
                      setSelectedProduct(
                        product
                      )
                    }
                  >
                    <img
                      src={product.image}
                      alt={
                        product.thaiName
                      }
                    />
                  </div>

                  <div className="product-info">
                    <span className="product-category">
                      {product.category}
                    </span>

                    <h3>
                      {product.thaiName}
                    </h3>

                    <p className="english-name">
                      {product.name}
                    </p>

                    <div className="product-bottom">
                      <strong>
                        ฿
                        {product.price.toLocaleString()}
                      </strong>

                      <button
                        className="add-button"
                        onClick={() =>
                          addToCart(
                            product
                          )
                        }
                      >
                        + เพิ่ม
                      </button>
                    </div>

                    <button
                      className="detail-button"
                      onClick={() =>
                        setSelectedProduct(
                          product
                        )
                      }
                    >
                      ดูรายละเอียดสินค้า
                    </button>
                  </div>
                </article>
              )
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <h2>AE’S STORE</h2>
          <p>BEAUTY & COSMETICS</p>
        </div>

        <div>
          <h3>หมวดหมู่สินค้า</h3>
          <p>เครื่องสำอาง</p>
          <p>ผลิตภัณฑ์บำรุงผิว</p>
          <p>ผลิตภัณฑ์ดูแลเส้นผม</p>
        </div>

        <div>
          <h3>บริการลูกค้า</h3>
          <p>เลือกซื้อสินค้า</p>
          <p>ตะกร้าสินค้า</p>
          <p>การสั่งซื้อสินค้า</p>
        </div>
      </footer>

      {showCart && (
        <>
          <div
            className="overlay"
            onClick={() =>
              setShowCart(false)
            }
          />

          <aside className="side-panel">
            <div className="panel-header">
              <div>
                <p>YOUR CART</p>
                <h2>ตะกร้าสินค้า</h2>
              </div>

              <button
                onClick={() =>
                  setShowCart(false)
                }
              >
                ✕
              </button>
            </div>

            <div className="cart-content">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-icon">
                    🛒
                  </div>

                  <h3>
                    ยังไม่มีสินค้าในตะกร้า
                  </h3>

                  <button
                    className="gold-button full"
                    onClick={() =>
                      setShowCart(
                        false
                      )
                    }
                  >
                    เลือกซื้อสินค้า
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(
                      (item) => (
                        <div
                          className="cart-item"
                          key={
                            item.id
                          }
                        >
                          <img
                            src={
                              item.image
                            }
                            alt={
                              item.thaiName
                            }
                          />

                          <div className="cart-item-info">
                            <h4>
                              {
                                item.thaiName
                              }
                            </h4>

                            <p>
                              ฿
                              {item.price.toLocaleString()}
                            </p>

                            <div className="quantity-row">
                              <button
                                onClick={() =>
                                  decreaseQuantity(
                                    item.id
                                  )
                                }
                              >
                                −
                              </button>

                              <span>
                                {
                                  item.quantity
                                }
                              </span>

                              <button
                                onClick={() =>
                                  increaseQuantity(
                                    item.id
                                  )
                                }
                              >
                                +
                              </button>
                            </div>

                            <button
                              className="remove-button"
                              onClick={() =>
                                removeFromCart(
                                  item.id
                                )
                              }
                            >
                              ลบสินค้า
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <div className="cart-summary">
                    <div>
                      <span>
                        จำนวนสินค้า
                      </span>
                      <strong>
                        {cartCount} ชิ้น
                      </strong>
                    </div>

                    <div>
                      <span>ยอดรวม</span>

                      <strong>
                        ฿
                        {cartTotal.toLocaleString()}
                      </strong>
                    </div>

                    <button
                      className="gold-button full"
                      onClick={
                        startCheckout
                      }
                    >
                      ดำเนินการสั่งซื้อ
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>
        </>
      )}

      {showLogin && (
        <>
          <div
            className="overlay"
            onClick={() =>
              setShowLogin(false)
            }
          />

          <aside className="side-panel">
            <div className="panel-header">
              <div>
                <p>WELCOME BACK</p>
                <h2>เข้าสู่ระบบ</h2>
              </div>

              <button
                onClick={() =>
                  setShowLogin(false)
                }
              >
                ✕
              </button>
            </div>

            <form
              className="form-panel"
              onSubmit={handleLogin}
            >
              <label>อีเมล</label>

              <input
                type="email"
                placeholder="กรอกอีเมล"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email:
                      e.target.value,
                  })
                }
                required
              />

              <label>รหัสผ่าน</label>

              <input
                type="password"
                placeholder="กรอกรหัสผ่าน"
                value={
                  loginData.password
                }
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password:
                      e.target.value,
                  })
                }
                required
              />

              <button
                className="gold-button full"
                type="submit"
              >
                เข้าสู่ระบบ
              </button>

              <div className="form-change">
                ยังไม่มีบัญชี?

                <button
                  type="button"
                  onClick={
                    openRegister
                  }
                >
                  สมัครสมาชิก
                </button>
              </div>
            </form>
          </aside>
        </>
      )}

      {showRegister && (
        <>
          <div
            className="overlay"
            onClick={() =>
              setShowRegister(false)
            }
          />

          <aside className="side-panel">
            <div className="panel-header">
              <div>
                <p>CREATE ACCOUNT</p>
                <h2>
                  สมัครสมาชิก
                </h2>
              </div>

              <button
                onClick={() =>
                  setShowRegister(false)
                }
              >
                ✕
              </button>
            </div>

            <form
              className="form-panel"
              onSubmit={
                handleRegister
              }
            >
              <label>
                ชื่อ - นามสกุล
              </label>

              <input
                type="text"
                placeholder="กรอกชื่อ - นามสกุล"
                value={
                  registerData.fullName
                }
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    fullName:
                      e.target.value,
                  })
                }
                required
              />

              <label>อีเมล</label>

              <input
                type="email"
                placeholder="กรอกอีเมล"
                value={
                  registerData.email
                }
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    email:
                      e.target.value,
                  })
                }
                required
              />

              <label>
                เบอร์โทรศัพท์
              </label>

              <input
                type="tel"
                placeholder="กรอกเบอร์โทรศัพท์"
                value={
                  registerData.phone
                }
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    phone:
                      e.target.value,
                  })
                }
                required
              />

              <label>รหัสผ่าน</label>

              <input
                type="password"
                placeholder="กรอกรหัสผ่าน"
                value={
                  registerData.password
                }
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password:
                      e.target.value,
                  })
                }
                required
              />

              <label>
                ยืนยันรหัสผ่าน
              </label>

              <input
                type="password"
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                value={
                  registerData.confirmPassword
                }
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword:
                      e.target.value,
                  })
                }
                required
              />

              <button
                className="gold-button full"
                type="submit"
              >
                สมัครสมาชิก
              </button>

              <div className="form-change">
                มีบัญชีอยู่แล้ว?

                <button
                  type="button"
                  onClick={() => {
                    setShowRegister(
                      false
                    );
                    setShowLogin(true);
                  }}
                >
                  เข้าสู่ระบบ
                </button>
              </div>
            </form>
          </aside>
        </>
      )}

      {selectedProduct && (
        <>
          <div
            className="modal-overlay"
            onClick={() =>
              setSelectedProduct(null)
            }
          />

          <div className="product-modal">
            <button
              className="modal-close"
              onClick={() =>
                setSelectedProduct(
                  null
                )
              }
            >
              ✕
            </button>

            <div className="modal-image">
              <img
                src={
                  selectedProduct.image
                }
                alt={
                  selectedProduct.thaiName
                }
              />
            </div>

            <div className="modal-content">
              <span className="product-category">
                {
                  selectedProduct.category
                }
              </span>

              <h2>
                {
                  selectedProduct.thaiName
                }
              </h2>

              <p className="modal-english">
                {selectedProduct.name}
              </p>

              <p className="modal-description">
                {
                  selectedProduct.description
                }
              </p>

              <div className="modal-price">
                ฿
                {selectedProduct.price.toLocaleString()}
              </div>

              <button
                className="gold-button full"
                onClick={() =>
                  addToCart(
                    selectedProduct
                  )
                }
              >
                🛒 เพิ่มลงตะกร้า
              </button>
            </div>
          </div>
        </>
      )}

      {showCheckout && (
        <>
          <div
            className="modal-overlay"
            onClick={() =>
              setShowCheckout(false)
            }
          />

          <div className="checkout-modal">
            <button
              className="modal-close"
              onClick={() =>
                setShowCheckout(false)
              }
            >
              ✕
            </button>

            <div className="checkout-heading">
              <p>CHECKOUT</p>
              <h2>
                ยืนยันการสั่งซื้อ
              </h2>
            </div>

            <form
              className="checkout-form"
              onSubmit={finishOrder}
            >
              <label>
                ชื่อ - นามสกุล
              </label>

              <input
                type="text"
                required
              />

              <label>
                เบอร์โทรศัพท์
              </label>

              <input
                type="tel"
                required
              />

              <label>
                ที่อยู่สำหรับจัดส่ง
              </label>

              <textarea
                rows="4"
                required
              />

              <label>
                วิธีการชำระเงิน
              </label>

              <select required>
                <option value="">
                  เลือกวิธีการชำระเงิน
                </option>

                <option value="transfer">
                  โอนเงินผ่านบัญชีธนาคาร
                </option>

                <option value="cod">
                  ชำระเงินปลายทาง
                </option>
              </select>

              <div className="checkout-total">
                <span>
                  ยอดชำระทั้งหมด
                </span>

                <strong>
                  ฿
                  {cartTotal.toLocaleString()}
                </strong>
              </div>

              <button
                className="gold-button full"
                type="submit"
              >
                ยืนยันการสั่งซื้อ
              </button>
            </form>
          </div>
        </>
      )}

      {orderSuccess && (
        <>
          <div className="modal-overlay" />

          <div className="success-modal">
            <div className="success-icon">
              ✓
            </div>

            <p>ORDER SUCCESS</p>

            <h2>
              สั่งซื้อสินค้าสำเร็จ
            </h2>

            <p className="success-text">
              ระบบได้รับคำสั่งซื้อของคุณเรียบร้อยแล้ว
              ขอบคุณที่เลือกซื้อสินค้ากับ
              AE’S STORE
            </p>

            <button
              className="gold-button full"
              onClick={() =>
                setOrderSuccess(false)
              }
            >
              กลับไปเลือกซื้อสินค้า
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;