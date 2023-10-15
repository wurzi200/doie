<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Offer</title>
  <style>
    @page {
      size: A4;
      margin: 0;
    }

    body {
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #333;
      margin: 0;
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

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    th,
    td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ccc;
    }

    th {
      font-weight: bold;
    }

    td:first-child {
      width: 50px;
    }

    td:nth-child(2) {
      width: 150px;
    }

    td:nth-child(4),
    td:nth-child(5),
    td:nth-child(6),
    td:nth-child(9) {
      text-align: right;
    }

    td:nth-child(4),
    td:nth-child(5),
    td:nth-child(6),
    td:nth-child(9) {
      font-weight: bold;
    }
  </style>
</head>

<body>
  <div class="container">
    <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      <h1 style="font-size: 32px; margin-bottom: 20px;">Proposal for [Client Name]</h1>

      <p>Dear [Client Name],</p>

      <p>Thank you for your interest in our services. We have prepared a detailed calculation for your project, which we believe will meet your requirements and budget.</p>

      <p>Our team has carefully analyzed your project specifications and has come up with the following proposal:</p>

      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Special</th>
            <th>Residual</th>
            <th>Interest</th>
            <th>Duration</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $calculation->id }}</td>
            <td>{{ $calculation->user->name }}</td>
            <td>{{ $calculation->calculationType->name }}</td>
            <td>{{ money($calculation->cost)->format() }}</td>
            <td>{{ money($calculation->special)->format() }}</td>
            <td>{{ money($calculation->residual)->format() }}</td>
            <td>{{ $calculation->interest }}</td>
            <td>{{ $calculation->duration }}</td>
            <td>{{ money($calculation->rate)->format() }}</td>
          </tr>
        </tbody>
      </table>

      <p>We are confident that our team has the necessary skills and experience to deliver a high-quality product that meets your expectations. We use the latest technologies and development methodologies to ensure that our projects are scalable, secure, and maintainable.</p>

      <p>If you have any questions or concerns about the proposal, please do not hesitate to contact us. We would be happy to discuss the details of the project with you and address any issues that you may have.</p>

      <p>Thank you for considering our proposal. We look forward to the opportunity to work with you.</p>

      <p>Best regards,</p>
      <p>[Your Company Name]</p>
    </div>
  </div>
</body>

</html>