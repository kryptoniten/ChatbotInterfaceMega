


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic Test Website</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }

        header {
            background-color: #333;
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }

        nav {
            background-color: #444;
            padding: 10px;
            text-align: center;
        }

        nav a {
            color: #fff;
            margin: 0 15px;
            text-decoration: none;
        }

        nav a:hover {
            text-decoration: underline;
        }

        .container {
            padding: 20px;
        }

        .content {
            background-color: #f4f4f4;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 5px;
        }

        footer {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 10px 0;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>
<body>

    <header>
        <h1>Welcome to My Test Website</h1>
    </header>

    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
    </nav>

    <div class="container">
        <section class="content">
            <h2>Home</h2>
            <p>This is the home section. You can add some introductory text here.</p>
        </section>

        <section class="content">
            <h2>About</h2>
            <p>This is the about section. You can include information about yourself or your business here.</p>
        </section>

        <section class="content">
            <h2>Services</h2>
            <p>This is the services section. List the services you offer here.</p>
        </section>

        <section class="content">
            <h2>Contact</h2>
            <p>This is the contact section. Provide your contact information here.</p>
        </section>
    </div>

    <footer>
        <p>&copy; 2024 My Test Website</p>
    </footer>

    <div class="chatbot-container">
        <script async id="vectorshift-chat-widget" src="https://app.vectorshift.ai/chatWidget.js" chatbot-id="666c2b54d3dcab10fbeb81df" chatbot-height="600px" chatbot-width="380px"></script>
      </div>
      
      <style>
        .chatbot-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      
        /* Ensures the chatbot is centered on smaller screens */
        @media (max-width: 600px) {
          .chatbot-container {
            width: 100%;
          }
      
          iframe {
            width: 100% !important;
            max-width: 340px; /* keeps it from exceeding the default width */
          }
        }
      </style>
</body>
</html>
