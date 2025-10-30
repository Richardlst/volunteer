## 📦 Cài đặt
```bash

Trong thư mục src, chú ý file App.jsx và các thư mục pages, services để làm backend thôi, còn các thư mục khác toàn là giao diện
```
### Yêu cầu hệ thống
- Node.js >= 18.x
- npm >= 9.x hoặc yarn >= 1.22.x

### Bước 1: Clone repository
```bash
git clone <repository-url>
cd volunteer-js
```

### Bước 2: Cài đặt dependencies
```bash
npm install

```
### Bước 3: Chạy development server
```bash
npm run dev

```

Mở trình duyệt tại: **http://localhost:5173**

### Bước 5: Build cho production
```bash
npm run build
---

## 🔌 API Endpoints (Cho Backend)

### Authentication
```
POST   /api/auth/register          # Đăng ký
POST   /api/auth/login             # Đăng nhập
POST   /api/auth/logout            # Đăng xuất
GET    /api/auth/me                # Lấy thông tin user hiện tại
POST   /api/auth/refresh-token     # Refresh JWT token
```

### Events (Sự kiện)
```
GET    /api/events                 # Lấy danh sách sự kiện
GET    /api/events/:id             # Lấy chi tiết sự kiện
POST   /api/events                 # Tạo sự kiện mới (Manager)
PUT    /api/events/:id             # Cập nhật sự kiện (Manager)
DELETE /api/events/:id             # Xóa sự kiện (Manager)
GET    /api/events/filter          # Lọc sự kiện (query params: category, date, location)
```

### Event Registrations (Đăng ký sự kiện)
```
POST   /api/events/:id/register    # Đăng ký tham gia sự kiện
DELETE /api/events/:id/unregister  # Hủy đăng ký
GET    /api/events/:id/registrations  # Lấy danh sách đăng ký (Manager)
PUT    /api/registrations/:id/approve # Duyệt đăng ký (Manager)
PUT    /api/registrations/:id/reject  # Từ chối đăng ký (Manager)
PUT    /api/registrations/:id/complete # Đánh dấu hoàn thành (Manager)
```

### User Events (Sự kiện của user)
```
GET    /api/users/me/events        # Sự kiện đã đăng ký
GET    /api/users/me/events/completed # Sự kiện đã hoàn thành
GET    /api/users/me/events/history   # Lịch sử tham gia
```

### Community (Kênh trao đổi)
```
GET    /api/events/:id/posts       # Lấy bài viết trong sự kiện
POST   /api/events/:id/posts       # Tạo bài viết mới
PUT    /api/posts/:id              # Cập nhật bài viết
DELETE /api/posts/:id              # Xóa bài viết
POST   /api/posts/:id/comments     # Comment vào bài viết
POST   /api/posts/:id/like         # Like bài viết
DELETE /api/posts/:id/like         # Unlike bài viết
```

### Notifications (Thông báo)
```
GET    /api/notifications          # Lấy danh sách thông báo
PUT    /api/notifications/:id/read # Đánh dấu đã đọc
PUT    /api/notifications/read-all # Đánh dấu tất cả đã đọc
DELETE /api/notifications/:id      # Xóa thông báo
```

### Admin
```
GET    /api/admin/events/pending   # Sự kiện chờ duyệt
PUT    /api/admin/events/:id/approve # Duyệt sự kiện
DELETE /api/admin/events/:id       # Xóa sự kiện
GET    /api/admin/users            # Danh sách người dùng
PUT    /api/admin/users/:id/lock   # Khóa tài khoản
PUT    /api/admin/users/:id/unlock # Mở khóa tài khoản
GET    /api/admin/export/events    # Xuất danh sách sự kiện (CSV/JSON)
GET    /api/admin/export/users     # Xuất danh sách users (CSV/JSON)
```

### Dashboard & Statistics
```
GET    /api/dashboard/stats        # Thống kê tổng quan
GET    /api/dashboard/trending     # Sự kiện trending
GET    /api/dashboard/recent       # Sự kiện mới
```

---


## 📊 Data Models (Cho Backend)

### User Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ['volunteer', 'manager', 'admin'],
  status: Enum ['active', 'locked'],
  avatar: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Event Schema
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  location: String,
  date: Date,
  startTime: String,
  endTime: String,
  maxParticipants: Number,
  currentParticipants: Number,
  status: Enum ['pending', 'approved', 'rejected', 'completed'],
  managerId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Registration Schema
```javascript
{
  _id: ObjectId,
  eventId: ObjectId (ref: Event),
  userId: ObjectId (ref: User),
  status: Enum ['pending', 'approved', 'rejected', 'completed'],
  registeredAt: Date,
  completedAt: Date,
  notes: String
}
```

### Post Schema (Community)
```javascript
{
  _id: ObjectId,
  eventId: ObjectId (ref: Event),
  userId: ObjectId (ref: User),
  content: String,
  images: [String],
  likes: [ObjectId] (ref: User),
  comments: [{
    userId: ObjectId (ref: User),
    content: String,
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Notification Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  type: Enum ['registration', 'approval', 'completion', 'event_update'],
  title: String,
  message: String,
  relatedId: ObjectId,
  isRead: Boolean,
  createdAt: Date
}
```


## 🧪 Testing

### Test với các role khác nhau
Trong file `src/App.jsx`, đổi `role` để test:

```javascript
// Volunteer
role: 'volunteer'

// Manager
role: 'manager'

// Admin
role: 'admin'
```


