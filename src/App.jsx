import { useRef, useState } from 'react'
import './App.css'

function App() {
  const productsSectionRef = useRef(null)

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
  const [registerConfirmPassword, setRegisterConfirmPassword] =
    useState('')

  const [currentUser, setCurrentUser] = useState(null)

  const [selectedProduct, setSelectedProduct] = useState(null)

  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [lastOrder, setLastOrder] = useState(null)

  const [shippingName, setShippingName] = useState('')
  const [shippingPhone, setShippingPhone] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('โอนผ่านธนาคาร')

  const products = [
    {
      id: 1,
      name: 'คูชั่นผิวแมทท์',
      description: 'คูชั่นเนื้อบางเบา ช่วยปกปิดและควบคุมความมัน',
      details:
        'คูชั่นสำหรับแต่งหน้าที่ให้ผิวดูเรียบเนียน เนื้อสัมผัสบางเบา เกลี่ยง่าย ช่วยปกปิดรอยต่าง ๆ และควบคุมความมันระหว่างวัน เหมาะสำหรับการแต่งหน้าในชีวิตประจำวัน',
      price: 490,
      icon: '🧴',
      tag: 'ขายดี',
      category: 'ใบหน้า',
    },
    {
      id: 2,
      name: 'ลิปทินท์',
      description: 'ลิปทินท์สีสวย เนื้อบางเบา สีติดทนนาน',
      details:
        'ลิปทินท์เนื้อบางเบา ให้สีสวยเป็นธรรมชาติ สามารถทาได้ทั้งแบบบาง ๆ หรือเพิ่มระดับสีให้ชัดขึ้น เหมาะสำหรับการแต่งหน้าหลายสไตล์',
      price: 299,
      icon: '💄',
      tag: 'มาใหม่',
      category: 'ใบหน้า',
    },
    {
      id: 3,
      name: 'แป้งคุมมัน',
      description: 'ช่วยควบคุมความมันและทำให้ผิวดูเรียบเนียน',
      details:
        'แป้งเนื้อละเอียดสำหรับควบคุมความมันบนใบหน้า ช่วยให้เมคอัพดูเรียบเนียนและช่วยลดความมันวาวระหว่างวัน',
      price: 350,
      icon: '🌸',
      tag: 'ขายดี',
      category: 'ใบหน้า',
    },
    {
      id: 4,
      name: 'เซรั่มบำรุงผิวหน้า',
      description: 'เซรั่มเนื้อบางเบา ช่วยเพิ่มความชุ่มชื้นให้ผิว',
      details:
        'เซรั่มบำรุงผิวหน้าที่มีเนื้อสัมผัสบางเบา ซึมง่าย ช่วยเพิ่มความชุ่มชื้นและดูแลผิวให้ดูสดใส เหมาะสำหรับใช้เป็นประจำ',
      price: 590,
      icon: '💧',
      tag: 'แนะนำ',
      category: 'ใบหน้า',
    },
    {
      id: 5,
      name: 'ครีมบำรุงผิวหน้า',
      description: 'มอยส์เจอไรเซอร์ช่วยเพิ่มความชุ่มชื้น',
      details:
        'ครีมบำรุงผิวหน้าสำหรับช่วยเติมความชุ่มชื้นให้ผิว เนื้อครีมนุ่ม สามารถใช้ได้เป็นประจำทั้งช่วงเช้าและก่อนนอน',
      price: 450,
      icon: '🫧',
      tag: '',
      category: 'ใบหน้า',
    },
    {
      id: 6,
      name: 'กันแดดสำหรับใบหน้า',
      description: 'ช่วยปกป้องผิวหน้าจากแสงแดด',
      details:
        'ผลิตภัณฑ์กันแดดสำหรับใบหน้า เนื้อบางเบา เกลี่ยง่าย เหมาะสำหรับใช้เป็นขั้นตอนสุดท้ายของการบำรุงผิวก่อนแต่งหน้า',
      price: 390,
      icon: '☀️',
      tag: 'ขายดี',
      category: 'ใบหน้า',
    },

    {
      id: 7,
      name: 'โลชั่นบำรุงผิวกาย',
      description: 'โลชั่นช่วยเพิ่มความชุ่มชื้นให้ผิวกาย',
      details:
        'โลชั่นบำรุงผิวกาย เนื้อสัมผัสนุ่ม ช่วยเพิ่มความชุ่มชื้นและดูแลผิวให้รู้สึกนุ่ม เหมาะสำหรับใช้หลังอาบน้ำ',
      price: 290,
      icon: '🧴',
      tag: 'ขายดี',
      category: 'ผิวกาย',
    },
    {
      id: 8,
      name: 'ครีมอาบน้ำ',
      description: 'ทำความสะอาดผิว พร้อมกลิ่นหอมสดชื่น',
      details:
        'ครีมอาบน้ำสำหรับทำความสะอาดผิวกาย ให้ความรู้สึกสดชื่นหลังอาบน้ำ พร้อมกลิ่นหอมอ่อน ๆ',
      price: 199,
      icon: '🧼',
      tag: '',
      category: 'ผิวกาย',
    },
    {
      id: 9,
      name: 'สครับผิวกาย',
      description: 'ช่วยผลัดเซลล์ผิวและทำให้ผิวรู้สึกเรียบเนียน',
      details:
        'สครับสำหรับผิวกายที่ช่วยทำความสะอาดและผลัดเซลล์ผิวอย่างอ่อนโยน เหมาะสำหรับใช้ในการดูแลผิวเป็นประจำ',
      price: 250,
      icon: '✨',
      tag: 'แนะนำ',
      category: 'ผิวกาย',
    },
    {
      id: 10,
      name: 'ครีมทามือ',
      description: 'ช่วยเพิ่มความชุ่มชื้นให้มือ',
      details:
        'ครีมบำรุงมือขนาดพกพา เนื้อสัมผัสนุ่ม ช่วยดูแลผิวบริเวณมือให้รู้สึกชุ่มชื้นและไม่แห้งตึง',
      price: 159,
      icon: '🤍',
      tag: 'มาใหม่',
      category: 'ผิวกาย',
    },
    {
      id: 11,
      name: 'กันแดดสำหรับผิวกาย',
      description: 'ผลิตภัณฑ์ปกป้องผิวกายจากแสงแดด',
      details:
        'กันแดดสำหรับผิวกาย เนื้อเกลี่ยง่าย เหมาะสำหรับใช้ก่อนออกไปทำกิจกรรมกลางแจ้ง',
      price: 420,
      icon: '🌞',
      tag: 'ขายดี',
      category: 'ผิวกาย',
    },
    {
      id: 12,
      name: 'บอดี้ออยล์',
      description: 'ออยล์บำรุงผิว เพิ่มความชุ่มชื้น',
      details:
        'บอดี้ออยล์สำหรับบำรุงผิวกาย ช่วยเพิ่มความชุ่มชื้นและทำให้ผิวดูมีความเปล่งปลั่ง สามารถใช้หลังอาบน้ำได้',
      price: 350,
      icon: '💧',
      tag: '',
      category: 'ผิวกาย',
    },

    {
      id: 13,
      name: 'แชมพูบำรุงเส้นผม',
      description: 'ทำความสะอาดและดูแลเส้นผม',
      details:
        'แชมพูสำหรับทำความสะอาดเส้นผมและหนังศีรษะ พร้อมช่วยดูแลให้เส้นผมรู้สึกสะอาดและนุ่มขึ้น',
      price: 289,
      icon: '🧴',
      tag: 'ขายดี',
      category: 'ผม',
    },
    {
      id: 14,
      name: 'ครีมนวดผม',
      description: 'ช่วยให้เส้นผมนุ่มและจัดทรงง่าย',
      details:
        'ครีมนวดผมสำหรับใช้หลังสระ ช่วยให้เส้นผมรู้สึกนุ่มและหวีง่ายขึ้น เหมาะสำหรับการดูแลเส้นผมเป็นประจำ',
      price: 269,
      icon: '🫧',
      tag: '',
      category: 'ผม',
    },
    {
      id: 15,
      name: 'ทรีตเมนต์บำรุงผม',
      description: 'ทรีตเมนต์ดูแลเส้นผมอย่างล้ำลึก',
      details:
        'ผลิตภัณฑ์ทรีตเมนต์สำหรับบำรุงเส้นผม เหมาะสำหรับใช้เสริมการดูแลเส้นผมให้รู้สึกนุ่มและจัดทรงง่าย',
      price: 390,
      icon: '✨',
      tag: 'แนะนำ',
      category: 'ผม',
    },
    {
      id: 16,
      name: 'เซรั่มบำรุงเส้นผม',
      description: 'ช่วยดูแลเส้นผมให้ดูเรียบลื่น',
      details:
        'เซรั่มสำหรับบำรุงเส้นผม สามารถใช้หลังสระหรือก่อนจัดแต่งทรงผม ช่วยให้เส้นผมดูเรียบลื่น',
      price: 320,
      icon: '💧',
      tag: 'มาใหม่',
      category: 'ผม',
    },
    {
      id: 17,
      name: 'สเปรย์บำรุงผม',
      description: 'สเปรย์ดูแลเส้นผม ใช้งานสะดวก',
      details:
        'ผลิตภัณฑ์บำรุงเส้นผมในรูปแบบสเปรย์ ใช้งานง่าย สามารถฉีดลงบนเส้นผมก่อนจัดแต่งทรง',
      price: 249,
      icon: '🌸',
      tag: '',
      category: 'ผม',
    },
    {
      id: 18,
      name: 'มาสก์บำรุงเส้นผม',
      description: 'ช่วยบำรุงเส้นผมให้รู้สึกนุ่ม',
      details:
        'มาสก์สำหรับการบำรุงเส้นผม เหมาะสำหรับใช้เป็นครั้งคราวเพื่อเพิ่มการดูแลเส้นผมจากการสระปกติ',
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

  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const openProductDetail = (product) => {
    setSelectedProduct(product)
  }

  const closeProductDetail = () => {
    setSelectedProduct(null)
  }

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    )
  }

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    )
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handleLogin = (event) => {
    event.preventDefault()

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

    alert('เข้าสู่ระบบสำเร็จ')
  }

  const handleRegister = (event) => {
    event.preventDefault()

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
      alert('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน')
      return
    }

    alert(
      'สมัครสมาชิกสำเร็จในระบบจำลอง ขั้นตอนต่อไปสามารถเชื่อม Supabase ได้'
    )

    setRegisterName('')
    setRegisterEmail('')
    setRegisterPassword('')
    setRegisterConfirmPassword('')

    setRegisterOpen(false)
    setLoginOpen(true)
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
    if (!shippingName || !shippingPhone || !shippingAddress) {
      alert('กรุณากรอกข้อมูลการจัดส่งให้ครบ')
      return
    }

    const orderNumber =
      'AES' + Date.now().toString().slice(-8)

    setLastOrder({
      orderNumber,
      total: cartTotal,
      paymentMethod,
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
      <header className="header">
        <div className="logo">
          <h1>AE’S STORE</h1>
          <span>BEAUTY & COSMETICS</span>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <button>🔍</button>
        </div>

        <div className="header-actions">
          {currentUser ? (
            <>
              <span className="member-name">
                👤 {currentUser.name}
              </span>

              <button
                className="text-button"
                onClick={handleLogout}
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <button
              className="text-button"
              onClick={() => setLoginOpen(true)}
            >
              👤 เข้าสู่ระบบ
            </button>
          )}

          <button
            className="text-button"
            onClick={() => setCartOpen(true)}
          >
            🛒 ตะกร้า ({cartCount})
          </button>
        </div>
      </header>

      <div className="main">
        <aside className="sidebar">
          <h3>หมวดหมู่สินค้า</h3>

          <button
            className={
              selectedCategory === 'ทั้งหมด'
                ? 'category active'
                : 'category'
            }
            onClick={() => setSelectedCategory('ทั้งหมด')}
          >
            🛍️ สินค้าทั้งหมด
          </button>

          <button
            className={
              selectedCategory === 'ใบหน้า'
                ? 'category active'
                : 'category'
            }
            onClick={() => setSelectedCategory('ใบหน้า')}
          >
            🌸 ผลิตภัณฑ์สำหรับใบหน้า
          </button>

          <button
            className={
              selectedCategory === 'ผิวกาย'
                ? 'category active'
                : 'category'
            }
            onClick={() => setSelectedCategory('ผิวกาย')}
          >
            🧴 ผลิตภัณฑ์สำหรับผิวกาย
          </button>

          <button
            className={
              selectedCategory === 'ผม'
                ? 'category active'
                : 'category'
            }
            onClick={() => setSelectedCategory('ผม')}
          >
            ✨ ผลิตภัณฑ์สำหรับผม
          </button>
        </aside>

        <main className="content">
          <section className="banner">
            <div className="banner-text">
              <span>AE'S STORE</span>

              <h2>
                สวยทุกวัน
                <br />
                ในแบบของคุณ
              </h2>

              <p>
                รวมผลิตภัณฑ์ความงามสำหรับใบหน้า ผิวกาย
                และเส้นผม
              </p>

              <button
                className="gold-button"
                onClick={scrollToProducts}
              >
                เลือกซื้อสินค้า →
              </button>
            </div>

            <div className="banner-icon">💄</div>
          </section>

          <section
            className="products-section"
            ref={productsSectionRef}
          >
            <div className="section-heading">
              <div>
                <span>AE'S COLLECTION</span>
                <h2>{categoryTitle}</h2>
              </div>

              <p>พบ {filteredProducts.length} รายการ</p>
            </div>

            <div className="products">
              {filteredProducts.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                  onClick={() => openProductDetail(product)}
                >
                  <div className="product-image">
                    {product.tag && (
                      <span className="tag">{product.tag}</span>
                    )}

                    <button
                      className="heart"
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                    >
                      ♡
                    </button>

                    <span className="product-icon">
                      {product.icon}
                    </span>

                    <div className="view-detail">
                      คลิกเพื่อดูรายละเอียด
                    </div>
                  </div>

                  <div className="product-info">
                    <span className="product-category">
                      {product.category}
                    </span>

                    <h3>{product.name}</h3>

                    <p>{product.description}</p>

                    <div className="product-bottom">
                      <strong>
                        ฿{product.price.toFixed(2)}
                      </strong>

                      <button
                        onClick={(event) => {
                          event.stopPropagation()
                          addToCart(product)
                        }}
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* รายละเอียดสินค้า */}
      {selectedProduct && (
        <div
          className="product-modal-overlay"
          onClick={closeProductDetail}
        >
          <div
            className="product-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="product-modal-close"
              onClick={closeProductDetail}
            >
              ×
            </button>

            <div className="product-modal-image">
              {selectedProduct.tag && (
                <span className="tag">
                  {selectedProduct.tag}
                </span>
              )}

              <span className="product-modal-icon">
                {selectedProduct.icon}
              </span>
            </div>

            <div className="product-modal-info">
              <span className="modal-category">
                {selectedProduct.category}
              </span>

              <h2>{selectedProduct.name}</h2>

              <div className="modal-price">
                ฿{selectedProduct.price.toFixed(2)}
              </div>

              <p className="modal-description">
                {selectedProduct.details}
              </p>

              <div className="product-detail-box">
                <h4>รายละเอียดสินค้า</h4>

                <p>
                  หมวดหมู่: {selectedProduct.category}
                </p>

                <p>
                  สถานะสินค้า: พร้อมจำหน่าย
                </p>

                <p>
                  จัดส่ง: ระบบจำลองสำหรับโครงงาน
                </p>
              </div>

              <button
                className="modal-cart-button"
                onClick={() => {
                  addToCart(selectedProduct)
                  closeProductDetail()
                  setCartOpen(true)
                }}
              >
                🛒 เพิ่มลงตะกร้า
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ตะกร้าสินค้า */}
      {cartOpen && (
        <div
          className="drawer-overlay"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <h2>ตะกร้าสินค้า</h2>

              <button onClick={() => setCartOpen(false)}>
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div>🛒</div>
                <h3>ยังไม่มีสินค้าในตะกร้า</h3>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div
                      className="cart-item"
                      key={item.id}
                    >
                      <div className="cart-item-icon">
                        {item.icon}
                      </div>

                      <div className="cart-item-info">
                        <h4>{item.name}</h4>

                        <p>
                          ฿{item.price.toFixed(2)}
                        </p>

                        <div className="quantity">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        className="remove-item"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>ยอดรวม</span>

                    <strong>
                      ฿{cartTotal.toFixed(2)}
                    </strong>
                  </div>

                  <button
                    className="gold-button full-button"
                    onClick={openCheckout}
                  >
                    ดำเนินการสั่งซื้อ
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* เข้าสู่ระบบ */}
      {loginOpen && (
        <div
          className="drawer-overlay"
          onClick={() => setLoginOpen(false)}
        >
          <div
            className="drawer auth-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <h2>เข้าสู่ระบบ</h2>

              <button
                onClick={() => setLoginOpen(false)}
              >
                ×
              </button>
            </div>

            <form
              className="auth-form"
              onSubmit={handleLogin}
            >
              <label>อีเมล</label>

              <input
                type="email"
                placeholder="กรอกอีเมล"
                value={loginEmail}
                onChange={(event) =>
                  setLoginEmail(event.target.value)
                }
              />

              <label>รหัสผ่าน</label>

              <input
                type="password"
                placeholder="กรอกรหัสผ่าน"
                value={loginPassword}
                onChange={(event) =>
                  setLoginPassword(event.target.value)
                }
              />

              <button
                type="submit"
                className="gold-button full-button"
              >
                เข้าสู่ระบบ
              </button>

              <p className="auth-switch">
                ยังไม่มีบัญชี?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setLoginOpen(false)
                    setRegisterOpen(true)
                  }}
                >
                  สมัครสมาชิก
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* สมัครสมาชิก */}
      {registerOpen && (
        <div
          className="drawer-overlay"
          onClick={() => setRegisterOpen(false)}
        >
          <div
            className="drawer auth-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <h2>สมัครสมาชิก</h2>

              <button
                onClick={() => setRegisterOpen(false)}
              >
                ×
              </button>
            </div>

            <form
              className="auth-form"
              onSubmit={handleRegister}
            >
              <label>ชื่อ</label>

              <input
                type="text"
                value={registerName}
                onChange={(event) =>
                  setRegisterName(event.target.value)
                }
              />

              <label>อีเมล</label>

              <input
                type="email"
                value={registerEmail}
                onChange={(event) =>
                  setRegisterEmail(event.target.value)
                }
              />

              <label>รหัสผ่าน</label>

              <input
                type="password"
                value={registerPassword}
                onChange={(event) =>
                  setRegisterPassword(event.target.value)
                }
              />

              <label>ยืนยันรหัสผ่าน</label>

              <input
                type="password"
                value={registerConfirmPassword}
                onChange={(event) =>
                  setRegisterConfirmPassword(
                    event.target.value
                  )
                }
              />

              <button
                type="submit"
                className="gold-button full-button"
              >
                สมัครสมาชิก
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ชำระเงิน */}
      {checkoutOpen && (
        <div className="checkout-overlay">
          <div className="checkout-modal">
            <button
              className="checkout-close"
              onClick={() => setCheckoutOpen(false)}
            >
              ×
            </button>

            <h2>ยืนยันการสั่งซื้อ</h2>

            <div className="checkout-grid">
              <div className="checkout-form">
                <label>ชื่อผู้รับ</label>

                <input
                  value={shippingName}
                  onChange={(event) =>
                    setShippingName(event.target.value)
                  }
                />

                <label>เบอร์โทรศัพท์</label>

                <input
                  value={shippingPhone}
                  onChange={(event) =>
                    setShippingPhone(event.target.value)
                  }
                />

                <label>ที่อยู่จัดส่ง</label>

                <textarea
                  value={shippingAddress}
                  onChange={(event) =>
                    setShippingAddress(
                      event.target.value
                    )
                  }
                />

                <label>วิธีชำระเงิน</label>

                <select
                  value={paymentMethod}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                >
                  <option>โอนผ่านธนาคาร</option>
                  <option>ชำระเงินปลายทาง</option>
                </select>
              </div>

              <div className="checkout-summary">
                <h3>สรุปคำสั่งซื้อ</h3>

                {cart.map((item) => (
                  <div
                    className="checkout-item"
                    key={item.id}
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <strong>
                      ฿
                      {(
                        item.price * item.quantity
                      ).toFixed(2)}
                    </strong>
                  </div>
                ))}

                <div className="checkout-total">
                  <span>ยอดรวม</span>

                  <strong>
                    ฿{cartTotal.toFixed(2)}
                  </strong>
                </div>

                <button
                  className="gold-button full-button"
                  onClick={confirmOrder}
                >
                  ยืนยันการสั่งซื้อ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* สั่งซื้อสำเร็จ */}
      {orderSuccess && lastOrder && (
        <div className="checkout-overlay">
          <div className="success-modal">
            <div className="success-icon">✓</div>

            <h2>สั่งซื้อสำเร็จ</h2>

            <p>
              ขอบคุณสำหรับการสั่งซื้อสินค้า
            </p>

            <div className="order-number">
              เลขที่คำสั่งซื้อ
              <strong>
                {lastOrder.orderNumber}
              </strong>
            </div>

            <div className="success-total">
              <span>ยอดรวม</span>

              <strong>
                ฿{lastOrder.total.toFixed(2)}
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