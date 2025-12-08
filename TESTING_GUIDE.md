# 🧪 Testing Guide - AI Features

## ✅ System Status

### Backend (Railway)
- **URL**: https://hackathon-ai-backend-production.up.railway.app/
- **Status**: ✅ ACTIVE
- **OpenAI**: ✅ Connected
- **Health Check**: https://hackathon-ai-backend-production.up.railway.app/health

### Frontend (GitHub Pages)
- **URL**: https://hanzalajahangir7.github.io/hackathon-physical-ai-textbook/
- **Status**: ✅ DEPLOYED
- **Backend Connection**: ✅ Railway

## 🔧 What I Fixed

### 1. **Added Comprehensive Error Handling**
- All frontend components now show detailed error messages
- Console logging for debugging
- 30-60 second timeouts for API calls

### 2. **Fixed Component Imports**
- ChatbotWidget.tsx - ✅ Fixed
- ChapterControls.tsx - ✅ Fixed and rewritten
- AskAIButton.tsx - ✅ Fixed and rewritten

### 3. **Improved Error Messages**
- Backend errors now show specific details
- Network errors are caught and displayed
- Timeout errors are handled gracefully

## 📋 Testing Steps

### Wait for Deployment (2-3 minutes)
GitHub Pages needs to rebuild with the new code. Wait until you see "Deployed" status.

### Step 1: Clear Browser Cache
```
Press: Ctrl + Shift + Delete
Select: "Cached images and files"
Click: "Clear data"

OR

Press: Ctrl + F5 (Hard refresh)
```

### Step 2: Open Developer Console
```
Press: F12
Click: "Console" tab
```
This will show you detailed logs of what's happening!

### Step 3: Test AI Chatbot 💬

1. Visit: https://hanzalajahangir7.github.io/hackathon-physical-ai-textbook/
2. Click the chat icon (💬) in bottom right
3. Type: "What is Physical AI?"
4. Click "Send"
5. **Check Console** for logs:
   - "Sending request to: ..."
   - "Response received: ..."
6. **Expected**: AI response in 3-5 seconds

**If Error**: Check console for specific error message

### Step 4: Test Translation 🌐

1. Go to any chapter page
2. Click "🌐 Translate to Urdu" button
3. Wait 10-20 seconds (translation takes longer)
4. **Check Console** for logs:
   - "Sending translation request to: ..."
   - "Translation response received"
5. **Expected**: Page content translated to Urdu

**If Error**: Check console - it will show the exact error

### Step 5: Test Personalization 👤

1. On any chapter page
2. Click "👤 Personalize for Me" button
3. Wait 10-20 seconds
4. **Check Console** for logs:
   - "Sending personalization request to: ..."
   - "Personalization response received"
5. **Expected**: Content adapted to your level

**If Error**: Check console for details

### Step 6: Test Ask AI (Text Selection)

1. Select some text on the page (highlight it)
2. Click "🤖 Ask AI about this" button that appears
3. Type a question about the selected text
4. Click "Ask AI"
5. **Check Console** for logs
6. **Expected**: AI answer about the selected text

## 🐛 Debugging

### If Chatbot Doesn't Work:

**Check Console Logs**:
```
Look for:
- "Sending request to: https://hackathon-ai-backend-production.up.railway.app/api/rag/query"
- Error messages with details
```

**Common Issues**:
1. **Network Error**: Backend might be down - check health endpoint
2. **Timeout Error**: Request took too long - backend might be slow
3. **500 Error**: Backend error - check Railway logs
4. **CORS Error**: Should not happen now, but check if you see it

### If Translation/Personalization Doesn't Work:

**Check Console Logs**:
```
Look for:
- "Sending translation/personalization request to: ..."
- Specific error messages
```

**Common Issues**:
1. **Timeout**: These operations take 10-60 seconds
2. **Content too long**: Try on a shorter chapter
3. **Backend error**: Check Railway logs

## 📊 What to Look For in Console

### ✅ Success Logs:
```
Sending request to: https://hackathon-ai-backend-production.up.railway.app/api/rag/query
Request data: {query: "What is Physical AI?", top_k: 5}
Response received: {answer: "Physical AI refers to..."}
```

### ❌ Error Logs:
```
Error details: AxiosError: Request failed with status code 500
Error response: {detail: "Error using AI model: ..."}
Error status: 500
```

The error logs will tell you EXACTLY what went wrong!

## 🎯 Expected Behavior

### Chatbot:
- ✅ Opens when clicked
- ✅ Sends message
- ✅ Shows "Thinking..." while loading
- ✅ Displays AI response in 3-5 seconds
- ✅ Shows specific error if something fails

### Translation:
- ✅ Button changes to "Processing..."
- ✅ Takes 10-20 seconds
- ✅ Page content changes to Urdu
- ✅ "Reset to Original" button appears
- ✅ Shows alert with specific error if fails

### Personalization:
- ✅ Button changes to "Processing..."
- ✅ Takes 10-20 seconds
- ✅ Content adapts to skill level
- ✅ "Reset to Original" button appears
- ✅ Shows alert with specific error if fails

## 🚀 Next Steps

1. **Wait 2-3 minutes** for GitHub Pages to rebuild
2. **Clear browser cache**
3. **Open Developer Console** (F12)
4. **Test each feature**
5. **Check console logs** for any errors
6. **Share console logs with me** if something doesn't work

The console logs will tell us EXACTLY what's happening! 🎯
