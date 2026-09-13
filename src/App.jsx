import { useState } from 'react'
import './App.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [searchText, setSearchText] = useState('')

  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')

  const [currentUser, setCurrentUser] = useState(null)

  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [lastOrder, setLastOrder] = useState(null)

  const [shippingName, setShippingName] = useState('')
  const [shippingPhone, setShippingPhone] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('bank')

  const products = [
    // =========================
    // ผลิตภัณฑ์สำหรับใบหน้า
    // =========================
    {
      id: 1,
      name: 'คูชั่นผิวแมทท์',
      description: 'คูชั่นเนื้อบางเบา ให้ผิวเรียบเนียน',
      price: 490,
      icon: '🧴',
      tag: 'ขายดี',
      category: 'ใบหน้า',
    },
    {
      id: 2,
      name: 'ลิปทินท์',
      description: 'ลิปสีสวย เนื้อบางเบา ติดทนนาน',
      price: 299,
      icon: '💄',
      tag: 'มาใหม่',
      category: 'ใบหน้า',
    },
    {
      id: 3,
      name: 'แป้งคุมมัน',
      description: 'แป้งเนื้อบางเบา ช่วยควบคุมความมัน',
      price: 350,
      icon: '🌸',
      tag: 'ขายดี',
      category: 'ใบหน้า',
    },
    {
      id: 4,
      name: 'เซรั่มบำรุงผิวหน้า',
      description: 'เพิ่มความชุ่มชื้นและบำรุงผิวหน้า',
      price: 590,
      icon: '💧',
      tag: 'แนะนำ',
      category: 'ใบหน้า',
    },
    {
      id: 5,
      name: 'ครีมบำรุงผิวหน้า',
      description: 'ช่วยให้ผิวดูนุ่มและชุ่มชื้น',
      price: 450,
      icon: '🫧',
      tag: '',
      category: 'ใบหน้า',
    },
    {
      id: 6,
      name: 'กันแดดสำหรับใบหน้า',
      description: 'ช่วยปกป้องผิวจากแสงแดด',
      price: 390,
      icon: '☀️',
      tag: 'ขายดี',
      category: 'ใบหน้า',
    },

    // =========================
    // ผลิตภัณฑ์สำหรับผิวกาย
    // =========================
    {
      id: 7,
      name: 'โลชั่นบำรุงผิวกาย',
      description: 'ช่วยให้ผิวนุ่มและชุ่มชื้น',
      price: 290,
      icon: '🧴',
      tag: 'ขายดี',
      category: 'ผิวกาย',
    },
    {
      id: 8,
      name: 'ครีมอาบน้ำ',
      description: 'ทำความสะอาดผิว พร้อมกลิ่นหอมสดชื่น',
      price: 199,
      icon: '🧼',
      tag: '',
      category: 'ผิวกาย',
    },
    {
      id: 9,
      name: 'สครับผิวกาย',
      description: 'ช่วยผลัดเซลล์ผิว ให้ผิวเรียบเนียน',
      price: 250,
      icon: '✨',
      tag: 'แนะนำ',
      category: 'ผิวกาย',
    },
    {
      id: 10,
      name: 'ครีมทามือ',
      description: 'เพิ่มความชุ่มชื้นให้มือและเล็บ',
      price: 159,
      icon: '🤍',
      tag: 'มาใหม่',
      category: 'ผิวกาย',
    },
    {
      id: 11,
      name: 'กันแดดสำหรับผิวกาย',
      description: 'ช่วยปกป้องผิวกายจากแสงแดด',
      price: 420,
      icon: '🌞',
      tag: 'ขายดี',
      category: 'ผิวกาย',
    },
    {
      id: 12,
      name: 'บอดี้ออยล์',
      description: 'น้ำมันบำรุงผิว ช่วยให้ผิวดูชุ่มชื้น',
      price: 350,
      icon: '💧',
      tag: '',
      category: 'ผิวกาย',
    },

    // =========================
    // ผลิตภัณฑ์สำหรับผม
    // =========================
    {
      id: 13,
      name: 'แชมพูบำรุงเส้นผม',
      description: 'ทำความสะอาดและบำรุงเส้นผม',
      price: 289,
      icon: '🧴',
      tag: 'ขายดี',
      category: 'ผม',
    },
    {
      id: 14,
      name: 'ครีมนวดผม',
      description: 'ช่วยให้เส้นผมนุ่มและจัดทรงง่าย',
      price: 269,
      icon: '🫧',
      tag: '',
      category: 'ผม',
    },
    {
      id: 15,
      name: 'ทรีตเมนต์บำรุงผม',
      description: 'ดูแลเส้นผมที่แห้งเสีย',
      price: 390,
      icon: '✨',
      tag: 'แนะนำ',
      category: 'ผม',
    },
    {
      id: 16,
      name: 'เซรั่มบำรุงเส้นผม',
      description: 'ช่วยให้เส้นผมดูเงางาม',
      price: 320,
      icon: '💧',
      tag: 'มาใหม่',
      category: 'ผม',
    },
    {
      id: 17,
      name: 'สเปรย์บำรุงผม',
      description: 'ช่วยดูแลเส้นผมและเพิ่มความหอม',
      price: 249,
      icon: '🌸',
      tag: '',
      category: 'ผม',
    },
    {
      id: 18,
      name: 'มาสก์บำรุงเส้นผม',
      description: 'บำรุงเส้นผมอย่างล้ำลึก',
      price: 450,
      icon: '💆‍♀️',
      tag: 'ขายดี',
      category: 'ผม',
    },
  ]

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === 'ทั้งหมด' ||
      product.category === selectedCategory

    const searchMatch =
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase())

    return categoryMatch && searchMatch
  })

  const categoryTitle =
    selectedCategory === 'ทั้งหมด'
      ? 'สินค้าทั้งหมด'
      : selectedCategory === 'ใบหน้า'
      ? 'ผลิตภัณฑ์สำหรับใบหน้า'
      : selectedCategory === 'ผิวกาย'
      ? 'ผลิตภัณฑ์สำหรับผิวกาย'
      : 'ผลิตภัณฑ์สำหรับผม'

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id)

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      )
    )
  }

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handleRegister = () => {
    if (
      !registerName ||
      !registerEmail ||
      !registerPassword ||
      !registerConfirmPassword
    ) {
      alert('กรุณากรอกข้อมูลให้ครบ')
      return
    }

    if (registerPassword !== registerConfirmPassword) {
      alert('รหัสผ่านไม่ตรงกัน')
      return
    }

    alert(
      'สมัครสมาชิกตัวอย่างสำเร็จ ตอนนี้ยังไม่ได้เชื่อมฐานข้อมูล Supabase'
    )

    setRegisterName('')
    setRegisterEmail('')
    setRegisterPassword('')
    setRegisterConfirmPassword('')

    setRegisterOpen(false)
    setLoginOpen(true)
  }

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      alert('กรุณากรอกอีเมลและรหัสผ่าน')
      return
    }

    setCurrentUser({
      name: 'สมาชิก AE’S STORE',
      email: loginEmail,
    })

    setLoginEmail('')
    setLoginPassword('')
    setLoginOpen(false)

    alert('เข้าสู่ระบบตัวอย่างสำเร็จ')
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  const openCheckout = () => {
    if (cart.length === 0) {
      alert('ยังไม่มีสินค้าในตะกร้า')
      return
    }

    setCartOpen(false)
    setCheckoutOpen(true)
  }

  const confirmOrder = () => {
    if (
      !shippingName ||
      !shippingPhone ||
      !shippingAddress
    ) {
      alert('กรุณากรอกข้อมูลการจัดส่งให้ครบ')
      return
    }

    const orderNumber =
      'AES' + Date.now().toString().slice(-8)

    setLastOrder({
      orderNumber,
      customerName: shippingName,
      phone: shippingPhone,
      address: shippingAddress,
      paymentMethod,
      items: cart,
      total: cartTotal,
    })

    setCheckoutOpen(false)
    setOrderSuccess(true)
  }

  const finishOrder = () => {
    setOrderSuccess(false)
    setCart([])
    setLastOrder(null)

    setShippingName('')
    setShippingPhone('')
    setShippingAddress('')
  }

  return (
    <div className="store">

      {/* HEADER */}

      <header className="header">

        <div className="logo">
          <h1>AE'S STORE</h1>
          <p>BEAUTY & COSMETICS</p>
        </div>

        <div className="search">

          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button>🔍</button>

        </div>

        <div className="header-actions">

          {!currentUser ? (
            <button
              onClick={() => {
                setCartOpen(false)
                setRegisterOpen(false)
                setLoginOpen(true)
              }}
            >
              👤 เข้าสู่ระบบ
            </button>
          ) : (
            <button onClick={handleLogout}>
              👤 {currentUser.name}
            </button>
          )}

          <button
            onClick={() => {
              setLoginOpen(false)
              setRegisterOpen(false)
              setCartOpen(true)
            }}
          >
            🛒 ตะกร้า ({cartCount})
          </button>

        </div>

      </header>

      <main className="main">

        {/* SIDEBAR */}

        <aside className="sidebar">

          <h3>หมวดหมู่สินค้า</h3>

          <button
            className={
              selectedCategory === 'ทั้งหมด'
                ? 'category active'
                : 'category'
            }
            onClick={() =>
              setSelectedCategory('ทั้งหมด')
            }
          >
            🛍️ สินค้าทั้งหมด
          </button>

          <button
            className={
              selectedCategory === 'ใบหน้า'
                ? 'category active'
                : 'category'
            }
            onClick={() =>
              setSelectedCategory('ใบหน้า')
            }
          >
            🌸 ผลิตภัณฑ์สำหรับใบหน้า
          </button>

          <button
            className={
              selectedCategory === 'ผิวกาย'
                ? 'category active'
                : 'category'
            }
            onClick={() =>
              setSelectedCategory('ผิวกาย')
            }
          >
            🧴 ผลิตภัณฑ์สำหรับผิวกาย
          </button>

          <button
            className={
              selectedCategory === 'ผม'
                ? 'category active'
                : 'category'
            }
            onClick={() =>
              setSelectedCategory('ผม')
            }
          >
            ✨ ผลิตภัณฑ์สำหรับผม
          </button>

        </aside>

        {/* CONTENT */}

        <section className="content">

          <div className="banner">

            <div className="banner-text">

              <span>AE'S STORE</span>

              <h2>
                สวยทุกวัน
                <br />
                ในแบบของคุณ
              </h2>

              <p>
                รวมผลิตภัณฑ์ความงามสำหรับใบหน้า
                ผิวกาย และเส้นผม
              </p>

              <button
                onClick={() =>
                  setSelectedCategory('ทั้งหมด')
                }
              >
                เลือกซื้อสินค้า →
              </button>

            </div>

            <div className="banner-decoration">
              💄
            </div>

          </div>

          <div className="section-heading">

            <div>
              <p>AE'S COLLECTION</p>
              <h2>{categoryTitle}</h2>
            </div>

            <span>
              พบ {filteredProducts.length} รายการ
            </span>

          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-products">
              ไม่พบสินค้าที่ค้นหา
            </div>
          ) : (

            <div className="products">

              {filteredProducts.map((product) => (

                <div
                  className="product-card"
                  key={product.id}
                >

                  <div className="product-image">

                    {product.tag && (
                      <span className="tag">
                        {product.tag}
                      </span>
                    )}

                    <button className="heart">
                      ♡
                    </button>

                    <span className="product-icon">
                      {product.icon}
                    </span>

                  </div>

                  <div className="product-info">

                    <small>
                      {product.category === 'ใบหน้า'
                        ? 'ผลิตภัณฑ์สำหรับใบหน้า'
                        : product.category === 'ผิวกาย'
                        ? 'ผลิตภัณฑ์สำหรับผิวกาย'
                        : 'ผลิตภัณฑ์สำหรับผม'}
                    </small>

                    <h3>{product.name}</h3>

                    <p>
                      {product.description}
                    </p>

                    <div className="product-bottom">

                      <strong>
                        ฿{product.price.toFixed(2)}
                      </strong>

                      <button
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        🛒
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </section>

      </main>

      {/* CART */}

      {cartOpen && (
        <div className="drawer-overlay">

          <div className="drawer">

            <div className="drawer-header">

              <div>
                <small>AE'S STORE</small>
                <h2>ตะกร้าสินค้า</h2>
              </div>

              <button
                onClick={() =>
                  setCartOpen(false)
                }
              >
                ✕
              </button>

            </div>

            {cart.length === 0 ? (

              <div className="empty-cart">
                <span>🛒</span>
                <h3>ตะกร้ายังว่างอยู่</h3>
                <p>เลือกสินค้าที่คุณชอบได้เลย</p>
              </div>

            ) : (

              <>

                <div className="cart-items">

                  {cart.map((item) => (

                    <div
                      className="cart-item"
                      key={item.id}
                    >

                      <div className="cart-image">
                        {item.icon}
                      </div>

                      <div className="cart-info">

                        <h3>{item.name}</h3>

                        <span>
                          ฿{item.price.toFixed(2)}
                        </span>

                        <div className="quantity">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                          >
                            −
                          </button>

                          <b>{item.quantity}</b>

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

                      </div>

                      <button
                        className="remove"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        ✕
                      </button>

                    </div>

                  ))}

                </div>

                <div className="cart-summary">

                  <div>
                    <span>จำนวนสินค้า</span>
                    <span>{cartCount} ชิ้น</span>
                  </div>

                  <div>
                    <span>ค่าจัดส่ง</span>
                    <span>ฟรี</span>
                  </div>

                  <div className="cart-total">
                    <span>ยอดรวม</span>

                    <strong>
                      ฿{cartTotal.toFixed(2)}
                    </strong>
                  </div>

                  <button
                    className="gold-button"
                    onClick={openCheckout}
                  >
                    CHECKOUT →
                  </button>

                </div>

              </>

            )}

          </div>

        </div>
      )}

      {/* LOGIN */}

      {loginOpen && (
        <div className="drawer-overlay">

          <div className="drawer auth-drawer">

            <div className="drawer-header">

              <div>
                <small>AE'S STORE</small>
                <h2>เข้าสู่ระบบ</h2>
              </div>

              <button
                onClick={() =>
                  setLoginOpen(false)
                }
              >
                ✕
              </button>

            </div>

            <div className="auth-content">

              <div className="auth-logo">
                <span>AE'S</span>
                <h2>Welcome Back</h2>
                <p>
                  เข้าสู่ระบบเพื่อเลือกซื้อสินค้า
                </p>
              </div>

              <label>อีเมล</label>

              <input
                type="email"
                placeholder="example@email.com"
                value={loginEmail}
                onChange={(e) =>
                  setLoginEmail(e.target.value)
                }
              />

              <label>รหัสผ่าน</label>

              <input
                type="password"
                placeholder="กรอกรหัสผ่าน"
                value={loginPassword}
                onChange={(e) =>
                  setLoginPassword(
                    e.target.value
                  )
                }
              />

              <button
                className="gold-button"
                onClick={handleLogin}
              >
                เข้าสู่ระบบ
              </button>

              <div className="switch-auth">

                <span>
                  ยังไม่มีบัญชี?
                </span>

                <button
                  onClick={() => {
                    setLoginOpen(false)
                    setRegisterOpen(true)
                  }}
                >
                  สมัครสมาชิก
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* REGISTER */}

      {registerOpen && (
        <div className="drawer-overlay">

          <div className="drawer auth-drawer">

            <div className="drawer-header">

              <div>
                <small>AE'S STORE</small>
                <h2>สมัครสมาชิก</h2>
              </div>

              <button
                onClick={() =>
                  setRegisterOpen(false)
                }
              >
                ✕
              </button>

            </div>

            <div className="auth-content">

              <div className="auth-logo">
                <span>AE'S</span>
                <h2>Create Account</h2>
                <p>
                  สร้างบัญชีสมาชิกใหม่
                </p>
              </div>

              <label>ชื่อ</label>

              <input
                type="text"
                placeholder="กรอกชื่อ"
                value={registerName}
                onChange={(e) =>
                  setRegisterName(
                    e.target.value
                  )
                }
              />

              <label>อีเมล</label>

              <input
                type="email"
                placeholder="example@email.com"
                value={registerEmail}
                onChange={(e) =>
                  setRegisterEmail(
                    e.target.value
                  )
                }
              />

              <label>รหัสผ่าน</label>

              <input
                type="password"
                placeholder="กรอกรหัสผ่าน"
                value={registerPassword}
                onChange={(e) =>
                  setRegisterPassword(
                    e.target.value
                  )
                }
              />

              <label>
                ยืนยันรหัสผ่าน
              </label>

              <input
                type="password"
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                value={
                  registerConfirmPassword
                }
                onChange={(e) =>
                  setRegisterConfirmPassword(
                    e.target.value
                  )
                }
              />

              <button
                className="gold-button"
                onClick={handleRegister}
              >
                สมัครสมาชิก
              </button>

              <div className="switch-auth">

                <span>
                  มีบัญชีแล้ว?
                </span>

                <button
                  onClick={() => {
                    setRegisterOpen(false)
                    setLoginOpen(true)
                  }}
                >
                  เข้าสู่ระบบ
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* CHECKOUT */}

      {checkoutOpen && (
        <div className="checkout-overlay">

          <div className="checkout">

            <div className="checkout-header">

              <div>
                <small>AE'S STORE</small>
                <h1>Checkout</h1>
              </div>

              <button
                onClick={() =>
                  setCheckoutOpen(false)
                }
              >
                ✕
              </button>

            </div>

            <div className="checkout-grid">

              <div className="checkout-form">

                <h2>
                  ข้อมูลการจัดส่ง
                </h2>

                <label>
                  ชื่อ-นามสกุล
                </label>

                <input
                  type="text"
                  placeholder="กรอกชื่อ-นามสกุล"
                  value={shippingName}
                  onChange={(e) =>
                    setShippingName(
                      e.target.value
                    )
                  }
                />

                <label>
                  เบอร์โทรศัพท์
                </label>

                <input
                  type="text"
                  placeholder="กรอกเบอร์โทรศัพท์"
                  value={shippingPhone}
                  onChange={(e) =>
                    setShippingPhone(
                      e.target.value
                    )
                  }
                />

                <label>
                  ที่อยู่จัดส่ง
                </label>

                <textarea
                  rows="5"
                  placeholder="กรอกที่อยู่สำหรับจัดส่ง"
                  value={shippingAddress}
                  onChange={(e) =>
                    setShippingAddress(
                      e.target.value
                    )
                  }
                />

                <h2 className="payment-title">
                  วิธีการชำระเงิน
                </h2>

                <label className="payment">

                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={
                      paymentMethod === 'bank'
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <div>
                    <b>โอนเงิน</b>
                    <small>
                      ระบบจำลองการชำระเงิน
                    </small>
                  </div>

                </label>

                <label className="payment">

                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={
                      paymentMethod === 'cod'
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <div>
                    <b>ชำระเงินปลายทาง</b>
                    <small>
                      ระบบจำลองการชำระเงิน
                    </small>
                  </div>

                </label>

              </div>

              <div className="order-summary">

                <h2>
                  สรุปคำสั่งซื้อ
                </h2>

                {cart.map((item) => (

                  <div
                    className="summary-item"
                    key={item.id}
                  >

                    <div className="summary-icon">
                      {item.icon}
                    </div>

                    <div>
                      <h4>{item.name}</h4>
                      <small>
                        จำนวน {item.quantity}
                      </small>
                    </div>

                    <strong>
                      ฿
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(2)}
                    </strong>

                  </div>

                ))}

                <div className="summary-total">

                  <span>
                    ยอดรวมทั้งหมด
                  </span>

                  <strong>
                    ฿{cartTotal.toFixed(2)}
                  </strong>

                </div>

                <button
                  className="gold-button"
                  onClick={confirmOrder}
                >
                  ยืนยันการสั่งซื้อ
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* SUCCESS */}

      {orderSuccess && lastOrder && (
        <div className="checkout-overlay">

          <div className="success">

            <div className="success-check">
              ✓
            </div>

            <small>AE'S STORE</small>

            <h1>
              สั่งซื้อสำเร็จ
            </h1>

            <p>
              ขอบคุณที่เลือกซื้อสินค้ากับเรา
            </p>

            <div className="order-number">

              <span>
                หมายเลขคำสั่งซื้อ
              </span>

              <strong>
                #{lastOrder.orderNumber}
              </strong>

            </div>

            <div className="success-products">

              {lastOrder.items.map(
                (item) => (

                  <div key={item.id}>

                    <span>
                      {item.name} ×{' '}
                      {item.quantity}
                    </span>

                    <strong>
                      ฿
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(2)}
                    </strong>

                  </div>

                )
              )}

            </div>

            <div className="success-total">

              <span>
                ยอดรวม
              </span>

              <strong>
                ฿
                {lastOrder.total.toFixed(2)}
              </strong>

            </div>

            <button
              className="gold-button"
              onClick={finishOrder}
            >
              กลับไปเลือกซื้อสินค้า
            </button>

          </div>

        </div>
      )}

    </div>
  )
}

export default App