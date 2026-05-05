# Fashion Web App — Project Context

## Project Overview
A full-stack fashion web app where users can upload photos of their clothing items,
which are analyzed by an AI vision API to generate descriptions and tags. Users can
then input natural language style prompts (e.g. "dress me like a fairy today") and 
receive AI-curated outfit suggestions from their personal wardrobe.

## Tech Stack
- Backend: Java 21, Spring Boot 3.4, Gradle
- Frontend: React, TypeScript, Vite
- Database: PostgreSQL (running locally on Docker Desktop)
- File Storage: AWS S3

## Project Structure
Fashion-WebApp/
├── fashion-frontend/     # React + TypeScript (Vite)
├── fashion-backend/      # Java Spring Boot

## Database
PostgreSQL is running locally via Docker Desktop.
Connection details go in application.properties:
- URL: jdbc:postgresql://localhost:5432/fashiondb
- Username: postgres
- Password: password
- Database name: fashiondb

## Current Task
Build a simple image upload feature:
1. Backend (Spring Boot):
   - Add AWS S3 SDK to build.gradle
   - Create S3Service to handle image uploads and return public URL
   - Create ClothingItem entity with fields: id (Long), name (String), imageUrl (String), category (String)
   - POST /api/items/upload — accepts multipart file + item name, uploads to S3, saves to PostgreSQL, returns saved item
   - GET /api/items — returns all clothing items

2. Frontend (React/TypeScript):
   - Upload form: image file picker + name input field
   - On submit: POST to http://localhost:8080/api/items/upload
   - Wardrobe grid: fetches from GET http://localhost:8080/api/items and displays each item as a card with image and name

## Notes
- Use placeholder values for S3 bucket name, region, and credentials in application.properties
- S3 bucket name will be: fashion-webapp-images
- Enable CORS in Spring Boot so the React frontend can call the backend