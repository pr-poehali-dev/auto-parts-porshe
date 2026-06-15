import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки на подбор запчасти на почту zapbmw@list.ru"""

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    vin = body.get('vin', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': cors,
            'body': json.dumps({'error': 'Имя и телефон обязательны'}, ensure_ascii=False),
        }

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    from_email = 'zapbmw@list.ru'
    to_email = 'zapbmw@list.ru'

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #222; background: #f5f5f5; padding: 32px;">
      <div style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
        <h2 style="color: #c0392b; margin-top: 0;">🚗 Новая заявка с сайта RU-PORSHE</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #777; width: 120px;">Имя:</td><td style="padding: 8px 0; font-weight: bold;">{name}</td></tr>
          <tr><td style="padding: 8px 0; color: #777;">Телефон:</td><td style="padding: 8px 0; font-weight: bold;">{phone}</td></tr>
          {'<tr><td style="padding: 8px 0; color: #777;">VIN-номер:</td><td style="padding: 8px 0; font-family: monospace;">' + vin + '</td></tr>' if vin else ''}
          {'<tr><td style="padding: 8px 0; color: #777; vertical-align: top;">Комментарий:</td><td style="padding: 8px 0;">' + comment + '</td></tr>' if comment else ''}
        </table>
      </div>
    </body></html>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Заявка от {name} — RU-PORSHE'
    msg['From'] = from_email
    msg['To'] = to_email
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'ok': True}, ensure_ascii=False),
    }
