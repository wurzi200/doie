<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Leasing Offer</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #333;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      font-size: 32px;
      margin-bottom: 20px;
    }

    p {
      margin-bottom: 10px;
    }

    ul {
      margin-bottom: 20px;
    }

    li {
      margin-bottom: 5px;
    }

    .signature {
      margin-top: 50px;
      text-align: right;
    }

    .signature p {
      margin-bottom: 5px;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Leasing Offer</h1>

    <p>Dear [Client Name],</p>

    <p>Thank you for your interest in our leasing services. We have prepared a detailed leasing offer for your consideration, which we believe will meet your requirements and budget.</p>

    <p>Our team has carefully analyzed your leasing needs and has come up with the following offer:</p>

    <ul>
      <li>Cost: {{ money($calculation->cost)->format() }}</li>
      <li>Lease Term: {{ $calculation->duration }}</li>
      <li>Monthly Payment: {{ money($calculation->rate)->format() }}</li>
      <li>Special Deposit: {{ money($calculation->special)->format() }}</li>
      <li>Interest: {{ $calculation->interest }}%</li>
      <li>Residual: {{ money($calculation->residual)->format() }}</li>
    </ul>

    <p>We are confident that our leasing services will provide you with the flexibility and convenience you need to grow your business. Our team is committed to providing you with the highest level of service and support throughout the leasing process.</p>

    <p>If you have any questions or concerns about the leasing offer, please do not hesitate to contact us. We would be happy to discuss the details of the offer with you and address any issues that you may have.</p>

    <p>Thank you for considering our leasing services. We look forward to the opportunity to work with you.</p>

    <div class="signature">
      <p>Best regards,</p>
      <p>{{ $calculation->organization->name }}</p>
    </div>
  </div>
</body>

</html>