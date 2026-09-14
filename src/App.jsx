import { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

const fallbackProducts = [
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
    image: "/images/18hmask.png",
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

  const [userRole, setUserRole] = useState("customer");
  const [showAdmin, setShowAdmin] = useState(false);

  // สินค้าที่โหลดจาก Supabase
  const [products, setProducts] = useState(fallbackProducts);

  // ฟอร์มเพิ่ม / แก้ไขสินค้าในหน้า Admin
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productImageFile, setProductImageFile] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    thaiName: "",
    category: "เครื่องสำอาง",
    price: "",
    image: "",
    description: "",
  });

  // ระบบคำสั่งซื้อ
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderSaving, setOrderSaving] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    fullName: "",
    phone: "",
    address: "",
    paymentMethod: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("โหลดสินค้าไม่สำเร็จ:", error.message);
      return;
    }

    const formattedProducts = (data || []).map((product) => ({
      id: product.id,
      name: product.name,
      thaiName: product.thai_name,
      category: product.category,
      price: Number(product.price),
      image: product.image,
      description: product.description,
    }));

    setProducts(formattedProducts);
  };

  const loadOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        user_id,
        customer_name,
        phone,
        address,
        payment_method,
        total,
        status,
        created_at,
        order_items (
          id,
          product_id,
          product_name,
          price,
          quantity,
          subtotal
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("โหลดคำสั่งซื้อไม่สำเร็จ:", error.message);
      return;
    }

    setOrders(data || []);
  };

  const loadUserRole = async (userId) => {
    if (!userId) {
      setUserRole("customer");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("ไม่สามารถโหลดสิทธิ์ผู้ใช้ได้:", error.message);
      setUserRole("customer");
      return;
    }

    setUserRole(data?.role || "customer");
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await loadUserRole(currentUser.id);
      } else {
        setUserRole("customer");
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        setTimeout(() => {
          loadUserRole(currentUser.id);
        }, 0);
      } else {
        setUserRole("customer");
        setShowAdmin(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (showAdmin && userRole === "admin") {
      loadOrders();
    }
  }, [showAdmin, userRole]);

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
  }, [products, selectedCategory, search]);

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
    await loadUserRole(data.user?.id);

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
    await loadUserRole(data.user.id);

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
    setUserRole("customer");
    setShowAdmin(false);

    alert("ออกจากระบบเรียบร้อย");
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setProductImageFile(null);
    setProductForm({
      name: "",
      thaiName: "",
      category: "เครื่องสำอาง",
      price: "",
      image: "",
      description: "",
    });
    setShowProductForm(true);
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);
    setProductImageFile(null);
    setProductForm({
      name: product.name || "",
      thaiName: product.thaiName || "",
      category: product.category || "เครื่องสำอาง",
      price: product.price ?? "",
      image: product.image || "",
      description: product.description || "",
    });
    setShowProductForm(true);
  };

  const saveProduct = async (event) => {
    event.preventDefault();

    if (!productForm.name.trim() || !productForm.thaiName.trim()) {
      alert("กรุณากรอกชื่อสินค้า");
      return;
    }

    if (!productForm.price || Number(productForm.price) <= 0) {
      alert("กรุณากรอกราคาให้ถูกต้อง");
      return;
    }

    let imageUrl = productForm.image.trim();

    if (productImageFile) {
      const extension = productImageFile.name.split(".").pop();
      const safeName = productForm.name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "product";
      const filePath = `${Date.now()}-${safeName}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, productImageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        alert("อัปโหลดรูปไม่สำเร็จ: " + uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    if (!imageUrl) {
      alert("กรุณาเลือกรูปสินค้า");
      return;
    }

    const productData = {
      name: productForm.name.trim(),
      thai_name: productForm.thaiName.trim(),
      category: productForm.category,
      price: Number(productForm.price),
      image: imageUrl,
      description: productForm.description.trim(),
    };

    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id);

      if (error) {
        alert("แก้ไขสินค้าไม่สำเร็จ: " + error.message);
        return;
      }

      alert("แก้ไขสินค้าเรียบร้อย");
    } else {
      const { error } = await supabase
        .from("products")
        .insert(productData);

      if (error) {
        alert("เพิ่มสินค้าไม่สำเร็จ: " + error.message);
        return;
      }

      alert("เพิ่มสินค้าเรียบร้อย");
    }

    await loadProducts();
    setShowProductForm(false);
    setEditingProduct(null);
    setProductImageFile(null);
  };

  const deleteProduct = async (product) => {
    const confirmDelete = window.confirm(
      `ต้องการลบสินค้า "${product.thaiName}" หรือไม่`
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) {
      alert("ลบสินค้าไม่สำเร็จ: " + error.message);
      return;
    }

    await loadProducts();
    alert("ลบสินค้าเรียบร้อย");
  };

  const startCheckout = () => {
    if (cart.length === 0) return;

    if (!user) {
      alert("กรุณาสมัครสมาชิกหรือเข้าสู่ระบบก่อนสั่งซื้อสินค้า");
      setShowCart(false);
      setShowLogin(true);
      return;
    }

    setCheckoutData({
      fullName: user.user_metadata?.full_name || "",
      phone: user.user_metadata?.phone || "",
      address: "",
      paymentMethod: "",
    });

    setShowCart(false);
    setShowCheckout(true);
  };

  const finishOrder = async (event) => {
    event.preventDefault();

    if (!user || cart.length === 0) return;

    setOrderSaving(true);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        customer_name: checkoutData.fullName.trim(),
        phone: checkoutData.phone.trim(),
        address: checkoutData.address.trim(),
        payment_method: checkoutData.paymentMethod,
        total: cartTotal,
        status: "รอดำเนินการ",
      })
      .select()
      .single();

    if (orderError) {
      setOrderSaving(false);
      alert("บันทึกคำสั่งซื้อไม่สำเร็จ: " + orderError.message);
      return;
    }

    const orderItems = cart.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.thaiName,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      await supabase.from("orders").delete().eq("id", order.id);
      setOrderSaving(false);
      alert("บันทึกรายการสินค้าไม่สำเร็จ: " + itemsError.message);
      return;
    }

    setOrderSaving(false);
    setShowCheckout(false);
    setOrderSuccess(true);
    setCart([]);
    setCheckoutData({
      fullName: "",
      phone: "",
      address: "",
      paymentMethod: "",
    });
  };

  const updateOrderStatus = async (orderId, status) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      alert("เปลี่ยนสถานะไม่สำเร็จ: " + error.message);
      return;
    }

    await loadOrders();
  };

  if (showAdmin && userRole === "admin") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0b0b0b",
          color: "#fff",
          fontFamily: '"Mali", sans-serif',
          padding: "32px 6% 60px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            paddingBottom: "24px",
            borderBottom: "1px solid #2c2c2c",
          }}
        >
          <div>
            <p
              style={{
                color: "#dfbd6d",
                letterSpacing: "4px",
                fontSize: "11px",
                margin: "0 0 6px",
              }}
            >
              AE’S STORE
            </p>
            <h1 style={{ margin: 0, fontSize: "32px" }}>Admin Dashboard</h1>
            <p style={{ color: "#888", marginBottom: 0 }}>จัดการข้อมูลร้านค้า</p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button className="top-button" onClick={() => setShowAdmin(false)}>
              ← กลับหน้าร้าน
            </button>
            <button className="top-button" onClick={handleLogout}>
              ออกจากระบบ
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "16px",
            marginTop: "28px",
          }}
        >
          {[
            ["สินค้า", `${products.length} รายการ`, "🛍️"],
            ["คำสั่งซื้อ", `${orders.length} รายการ`, "📦"],
            ["สถานะบัญชี", "ผู้ดูแลระบบ", "👑"],
            ["บัญชี", user?.email || "-", "👤"],
          ].map(([label, value, icon]) => (
            <div
              key={label}
              style={{
                border: "1px solid #333",
                background: "#121212",
                borderRadius: "16px",
                padding: "22px",
              }}
            >
              <div style={{ fontSize: "28px" }}>{icon}</div>
              <p style={{ color: "#888", margin: "12px 0 4px", fontSize: "13px" }}>
                {label}
              </p>
              <strong style={{ color: "#dfbd6d", fontSize: "20px" }}>{value}</strong>
            </div>
          ))}
        </div>

        <section
          style={{
            marginTop: "28px",
            border: "1px solid #2d2d2d",
            background: "#111",
            borderRadius: "18px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "20px 22px",
              borderBottom: "1px solid #2d2d2d",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p style={{ color: "#dfbd6d", margin: "0 0 5px", fontSize: "11px" }}>
                PRODUCT MANAGEMENT
              </p>
              <h2 style={{ margin: 0 }}>รายการสินค้า</h2>
            </div>
            <button
              className="gold-button"
              type="button"
              onClick={openAddProduct}
            >
              + เพิ่มสินค้า
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "720px" }}>
              <thead>
                <tr style={{ color: "#aaa", textAlign: "left" }}>
                  <th style={{ padding: "14px 18px" }}>รูป</th>
                  <th style={{ padding: "14px 18px" }}>สินค้า</th>
                  <th style={{ padding: "14px 18px" }}>หมวดหมู่</th>
                  <th style={{ padding: "14px 18px" }}>ราคา</th>
                  <th style={{ padding: "14px 18px" }}>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={{ borderTop: "1px solid #252525" }}>
                    <td style={{ padding: "12px 18px" }}>
                      <img
                        src={product.image}
                        alt={product.thaiName}
                        style={{
                          width: "58px",
                          height: "58px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </td>
                    <td style={{ padding: "12px 18px" }}>
                      <strong>{product.thaiName}</strong>
                      <div style={{ color: "#777", fontSize: "12px", marginTop: "3px" }}>
                        {product.name}
                      </div>
                    </td>
                    <td style={{ padding: "12px 18px", color: "#bbb" }}>
                      {product.category}
                    </td>
                    <td style={{ padding: "12px 18px", color: "#dfbd6d" }}>
                      ฿{product.price.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px 18px" }}>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button
                          className="detail-button"
                          type="button"
                          style={{ width: "auto", margin: 0, padding: "8px 12px" }}
                          onClick={() => openEditProduct(product)}
                        >
                          ✏️ แก้ไข
                        </button>

                        <button
                          type="button"
                          style={{
                            border: "1px solid #743b3b",
                            background: "#251414",
                            color: "#e59a9a",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteProduct(product)}
                        >
                          🗑️ ลบ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          style={{
            marginTop: "28px",
            border: "1px solid #2d2d2d",
            background: "#111",
            borderRadius: "18px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "20px 22px",
              borderBottom: "1px solid #2d2d2d",
            }}
          >
            <p style={{ color: "#dfbd6d", margin: "0 0 5px", fontSize: "11px" }}>
              ORDER MANAGEMENT
            </p>
            <h2 style={{ margin: 0 }}>รายการคำสั่งซื้อ</h2>
          </div>

          {orders.length === 0 ? (
            <div style={{ padding: "24px", color: "#888" }}>
              ยังไม่มีคำสั่งซื้อ
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "980px" }}>
                <thead>
                  <tr style={{ color: "#aaa", textAlign: "left" }}>
                    <th style={{ padding: "14px 18px" }}>เลขออเดอร์</th>
                    <th style={{ padding: "14px 18px" }}>ลูกค้า</th>
                    <th style={{ padding: "14px 18px" }}>สินค้า</th>
                    <th style={{ padding: "14px 18px" }}>ยอดรวม</th>
                    <th style={{ padding: "14px 18px" }}>การชำระเงิน</th>
                    <th style={{ padding: "14px 18px" }}>สถานะ</th>
                    <th style={{ padding: "14px 18px" }}>รายละเอียด</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} style={{ borderTop: "1px solid #252525", verticalAlign: "top" }}>
                      <td style={{ padding: "14px 18px", color: "#dfbd6d" }}>
                        #{order.id}
                        <div style={{ color: "#777", fontSize: "11px", marginTop: "5px" }}>
                          {new Date(order.created_at).toLocaleString("th-TH")}
                        </div>
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <strong>{order.customer_name}</strong>
                        <div style={{ color: "#aaa", fontSize: "12px", marginTop: "4px" }}>
                          {order.phone}
                        </div>
                        <div style={{ color: "#777", fontSize: "12px", marginTop: "4px", maxWidth: "220px" }}>
                          {order.address}
                        </div>
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        {(order.order_items || []).map((item) => (
                          <div key={item.id} style={{ marginBottom: "6px", color: "#ccc", fontSize: "13px" }}>
                            {item.product_name} × {item.quantity}
                          </div>
                        ))}
                      </td>
                      <td style={{ padding: "14px 18px", color: "#dfbd6d", fontWeight: 700 }}>
                        ฿{Number(order.total).toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 18px", color: "#bbb" }}>
                        {order.payment_method === "transfer"
                          ? "โอนเงินผ่านบัญชีธนาคาร"
                          : "ชำระเงินปลายทาง"}
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <select
                          value={order.status}
                          onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                          style={{
                            padding: "9px 10px",
                            borderRadius: "8px",
                            border: "1px solid #444",
                            background: "#171717",
                            color: "#fff",
                          }}
                        >
                          <option value="รอดำเนินการ">รอดำเนินการ</option>
                          <option value="กำลังจัดส่ง">กำลังจัดส่ง</option>
                          <option value="สำเร็จ">สำเร็จ</option>
                        </select>
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <button
                          type="button"
                          className="detail-button"
                          style={{ width: "auto", margin: 0, padding: "8px 12px" }}
                          onClick={() => setSelectedOrder(order)}
                        >
                          ดูรายละเอียด
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {selectedOrder && (
          <>
            <div
              className="modal-overlay"
              onClick={() => setSelectedOrder(null)}
            />

            <div className="checkout-modal" style={{ maxWidth: "760px" }}>
              <button
                className="modal-close"
                type="button"
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>

              <div className="checkout-heading">
                <p>ORDER DETAILS</p>
                <h2>รายละเอียดคำสั่งซื้อ #{selectedOrder.id}</h2>
              </div>

              <div style={{ display: "grid", gap: "14px" }}>
                <div
                  style={{
                    border: "1px solid #333",
                    borderRadius: "12px",
                    padding: "16px",
                    background: "#151515",
                  }}
                >
                  <h3 style={{ margin: "0 0 12px", color: "#dfbd6d" }}>ข้อมูลลูกค้า</h3>
                  <p style={{ margin: "5px 0" }}><strong>ชื่อ:</strong> {selectedOrder.customer_name}</p>
                  <p style={{ margin: "5px 0" }}><strong>เบอร์โทร:</strong> {selectedOrder.phone}</p>
                  <p style={{ margin: "5px 0" }}><strong>ที่อยู่:</strong> {selectedOrder.address}</p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>วิธีชำระเงิน:</strong>{" "}
                    {selectedOrder.payment_method === "transfer"
                      ? "โอนเงินผ่านบัญชีธนาคาร"
                      : "ชำระเงินปลายทาง"}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>วันที่สั่งซื้อ:</strong>{" "}
                    {new Date(selectedOrder.created_at).toLocaleString("th-TH")}
                  </p>
                </div>

                <div
                  style={{
                    border: "1px solid #333",
                    borderRadius: "12px",
                    padding: "16px",
                    background: "#151515",
                  }}
                >
                  <h3 style={{ margin: "0 0 12px", color: "#dfbd6d" }}>รายการสินค้า</h3>

                  {(selectedOrder.order_items || []).map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: "10px",
                        padding: "10px 0",
                        borderBottom: "1px solid #2b2b2b",
                      }}
                    >
                      <div>
                        <strong>{item.product_name}</strong>
                        <div style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}>
                          ฿{Number(item.price).toLocaleString()} × {item.quantity} ชิ้น
                        </div>
                      </div>
                      <strong style={{ color: "#dfbd6d" }}>
                        ฿{Number(item.subtotal).toLocaleString()}
                      </strong>
                    </div>
                  ))}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "16px",
                      fontSize: "18px",
                    }}
                  >
                    <strong>ยอดรวมทั้งหมด</strong>
                    <strong style={{ color: "#dfbd6d", fontSize: "24px" }}>
                      ฿{Number(selectedOrder.total).toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <span style={{ color: "#999", marginRight: "8px" }}>สถานะ:</span>
                    <strong style={{ color: "#dfbd6d" }}>{selectedOrder.status}</strong>
                  </div>

                  <button
                    className="gold-button"
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                  >
                    ปิดรายละเอียด
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {showProductForm && (
          <>
            <div
              className="modal-overlay"
              onClick={() => setShowProductForm(false)}
            />

            <div className="checkout-modal">
              <button
                className="modal-close"
                type="button"
                onClick={() => setShowProductForm(false)}
              >
                ✕
              </button>

              <div className="checkout-heading">
                <p>PRODUCT MANAGEMENT</p>
                <h2>{editingProduct ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}</h2>
              </div>

              <form className="checkout-form" onSubmit={saveProduct}>
                <label>ชื่อสินค้าภาษาไทย</label>
                <input
                  type="text"
                  value={productForm.thaiName}
                  onChange={(event) =>
                    setProductForm({
                      ...productForm,
                      thaiName: event.target.value,
                    })
                  }
                  required
                />

                <label>ชื่อสินค้าภาษาอังกฤษ</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(event) =>
                    setProductForm({
                      ...productForm,
                      name: event.target.value,
                    })
                  }
                  required
                />

                <label>หมวดหมู่</label>
                <select
                  value={productForm.category}
                  onChange={(event) =>
                    setProductForm({
                      ...productForm,
                      category: event.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #444",
                    background: "#171717",
                    color: "#fff",
                  }}
                  required
                >
                  <option value="เครื่องสำอาง">เครื่องสำอาง</option>
                  <option value="บำรุงผิวหน้า">บำรุงผิวหน้า</option>
                  <option value="บำรุงผิวกาย">บำรุงผิวกาย</option>
                  <option value="ดูแลเส้นผม">ดูแลเส้นผม</option>
                </select>

                <label>ราคา</label>
                <input
                  type="number"
                  min="1"
                  value={productForm.price}
                  onChange={(event) =>
                    setProductForm({
                      ...productForm,
                      price: event.target.value,
                    })
                  }
                  required
                />

                <label>รูปสินค้า</label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(event) =>
                    setProductImageFile(event.target.files?.[0] || null)
                  }
                />

                {productImageFile && (
                  <p style={{ color: "#c7a95b", fontSize: "13px", marginTop: "6px" }}>
                    รูปที่เลือก: {productImageFile.name}
                  </p>
                )}

                {editingProduct && productForm.image && !productImageFile && (
                  <div style={{ marginTop: "8px" }}>
                    <p style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
                      รูปปัจจุบัน (ถ้าไม่เลือกรูปใหม่ จะใช้รูปเดิม)
                    </p>
                    <img
                      src={productForm.image}
                      alt={productForm.thaiName || "รูปสินค้า"}
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        border: "1px solid #333",
                      }}
                    />
                  </div>
                )}

                <label>รายละเอียดสินค้า</label>
                <textarea
                  rows="4"
                  value={productForm.description}
                  onChange={(event) =>
                    setProductForm({
                      ...productForm,
                      description: event.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #444",
                    background: "#171717",
                    color: "#fff",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />

                <button className="gold-button full" type="submit">
                  {editingProduct ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    );
  }

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

                {userRole === "admin" && (
                  <button
                    className="top-button"
                    onClick={() => setShowAdmin(true)}
                  >
                    ⚙️ จัดการร้าน
                  </button>
                )}

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
                value={checkoutData.fullName}
                onChange={(event) =>
                  setCheckoutData({ ...checkoutData, fullName: event.target.value })
                }
                required
              />

              <label>
                เบอร์โทรศัพท์
              </label>

              <input
                type="tel"
                value={checkoutData.phone}
                onChange={(event) =>
                  setCheckoutData({ ...checkoutData, phone: event.target.value })
                }
                required
              />

              <label>
                ที่อยู่สำหรับจัดส่ง
              </label>

              <textarea
                rows="4"
                value={checkoutData.address}
                onChange={(event) =>
                  setCheckoutData({ ...checkoutData, address: event.target.value })
                }
                required
              />

              <label>
                วิธีการชำระเงิน
              </label>

              <select
                value={checkoutData.paymentMethod}
                onChange={(event) =>
                  setCheckoutData({ ...checkoutData, paymentMethod: event.target.value })
                }
                required
              >
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
                disabled={orderSaving}
              >
                {orderSaving ? "กำลังบันทึกคำสั่งซื้อ..." : "ยืนยันการสั่งซื้อ"}
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
