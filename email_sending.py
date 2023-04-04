from pathlib import Path
from jinja2 import Environment, PackageLoader, select_autoescape, FileSystemLoader
from django.core.mail import EmailMultiAlternatives, DEFAULT_ATTACHMENT_MIME_TYPE
from django.template.loader import get_template
from django.conf import settings

def send_template_email(template, to, subj, **kwargs):
    """Sends an email using a template."""
    # p = Path(__file__).parent / 'templates'
    # env = Environment(
    #     loader=FileSystemLoader(Path(p)),
    #     autoescape=select_autoescape(['html', 'xml'])
    # )
    params = kwargs
        
    print('Lokacija:', Path(__file__).absolute)
    print('Parent:', Path(__file__).parent)
    template = get_template('email.html') #= env.get_template(template)
    template_message = template.render(params)
    send_email(to, subj, template_message)


def send_email( to, subj, html_content):
    subject, from_email, to = subj, 'Rasadnik Ema', to
    text_content = 'Hvala vam sto kupujete kod nas.'
    html_content = html_content
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to,'s_polic@yahoo.com'])
    msg.attach_alternative(html_content, "text/html")
    msg.send()

       