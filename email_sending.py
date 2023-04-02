from pathlib import Path
from jinja2 import Environment, PackageLoader, select_autoescape, FileSystemLoader
from django.core.mail import EmailMultiAlternatives

def send_template_email(template, to, subj, **kwargs):
    """Sends an email using a template."""
    p = Path(__file__).parent / 'templates'
    env = Environment(
        loader=FileSystemLoader(Path(p)),
        autoescape=select_autoescape(['html', 'xml'])
    )
    template = env.get_template(template)
    send_email(to, subj, template.render(**kwargs))


def send_email( to, subj, html_content):
    subject, from_email, to = subj, 'Rasadnik Ema', to
    text_content = 'Hvala vam sto kupujete kod nas.'
    html_content = html_content
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to,'s_polic@yahoo.com'])
    msg.attach_alternative(html_content, "text/html")
    msg.send()