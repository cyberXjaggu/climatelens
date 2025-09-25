# MongoDB Atlas Setup Guide 🍃

## 🚨 Authentication Failed? Follow This Guide!

### Step 1: Run Diagnosis
```bash
npm run diagnose
```
This will analyze your connection string and identify issues.

### Step 2: Check MongoDB Atlas Dashboard

#### 2.1 Database Access (Users)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your project: **climatelens**
3. Go to **Database Access** in the left sidebar
4. Check if user `climatelens` exists
5. If not, create a new user:
   - Username: `climatelens`
   - Password: `climatelens123` (or your preferred password)
   - Database User Privileges: **Read and write to any database**

#### 2.2 Network Access (IP Whitelist)
1. Go to **Network Access** in the left sidebar
2. Check if your IP is whitelisted
3. For testing, add: `0.0.0.0/0` (allows all IPs)
4. Click **Add IP Address** → **Allow Access from Anywhere**

#### 2.3 Database Deployment (Cluster)
1. Go to **Database** in the left sidebar
2. Ensure your cluster `climatelens` is running (green status)
3. Click **Connect** on your cluster
4. Choose **Connect your application**
5. Copy the connection string

### Step 3: Update Your .env File

Your connection string should look like this:
```env
MONGODB_URI=mongodb+srv://climatelens:climatelens123@climatelens.yxvrhoy.mongodb.net/climatelens?retryWrites=true&w=majority&appName=climatelens
```

**Important Notes:**
- Replace `climatelens` with your actual username
- Replace `climatelens123` with your actual password
- Replace `climatelens.yxvrhoy.mongodb.net` with your actual cluster URL
- The database name is `climatelens` (after the last `/`)

### Step 4: Handle Special Characters in Password

If your password contains special characters, you need to URL encode them:

| Character | URL Encoded |
|-----------|-------------|
| `@` | `%40` |
| `:` | `%3A` |
| `/` | `%2F` |
| `?` | `%3F` |
| `#` | `%23` |
| `[` | `%5B` |
| `]` | `%5D` |
| `%` | `%25` |

Example: If password is `pass@123`, use `pass%40123`

### Step 5: Test Connection
```bash
npm run test-atlas
```

### Step 6: Common Solutions

#### Solution 1: Recreate Database User
1. Delete existing user in Database Access
2. Create new user with same credentials
3. Ensure "Read and write to any database" permission

#### Solution 2: Check Cluster Status
1. Ensure cluster is not paused
2. Wait for cluster to be fully active (green status)

#### Solution 3: Try Different Connection Method
Update your connection string to use the standard format:
```env
MONGODB_URI=mongodb+srv://climatelens:climatelens123@climatelens.yxvrhoy.mongodb.net/?retryWrites=true&w=majority&appName=climatelens
```
(Note: database name moved to connection options)

#### Solution 4: Create App-Specific Password
1. In Database Access, edit your user
2. Click "Edit" → "Edit Password"
3. Generate a new password
4. Update your .env file

### Step 7: Verify Setup Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Database user exists with correct username/password
- [ ] User has "Read and write to any database" permissions
- [ ] Your IP is whitelisted (or 0.0.0.0/0 for testing)
- [ ] Connection string format is correct
- [ ] Special characters in password are URL encoded
- [ ] Database name is specified in connection string

### Step 8: Test Commands (Run in Order)
```bash
# 1. Diagnose connection string
npm run diagnose

# 2. Test Atlas connection
npm run test-atlas

# 3. Initialize database (only after successful connection)
npm run init-db

# 4. Start server
npm start
```

### 🆘 Still Having Issues?

1. **Try a simple password**: Use only letters and numbers (no special characters)
2. **Check MongoDB Atlas status**: Visit [status.mongodb.com](https://status.mongodb.com/)
3. **Use MongoDB Compass**: Download and test connection with MongoDB Compass GUI
4. **Contact MongoDB Support**: If you have a paid plan

### 📞 Quick Debug Commands
```bash
# Check if .env file is correct
cat .env

# Test with curl (if server is running)
curl http://localhost:5000/api/health

# Check server logs
npm start
```

### 🔧 Alternative: Use MongoDB Atlas Connection String Builder
1. Go to your cluster in MongoDB Atlas
2. Click "Connect" → "Connect your application"
3. Select "Node.js" and version "4.1 or later"
4. Copy the provided connection string
5. Replace `<password>` with your actual password
6. Add `/climatelens` before the `?` for database name
