interface Options {
	title: string;
	message: string;
	link: string;
	logo: string;
	banner: string;
	btnTitle: string;
}

export const generateTemplate = (options: Options) => {
	const { title, message, link, logo, banner, btnTitle } = options;

	return `<!DOCTYPE html>

    <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
    <head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <style>
            * {
                box-sizing: border-box;
            }
    
            body {
                margin: 0;
                padding: 0;
            }
    
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
            }
    
            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
            }
    
            p {
                line-height: inherit
            }
    
            .desktop_hide,
            .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
            }
    
            .image_block img+div {
                display: none;
            }
    
            @media (max-width:520px) {
    
                .desktop_hide table.icons-inner,
                .social_block.desktop_hide .social-table {
                    display: inline-block !important;
                }
    
                .icons-inner {
                    text-align: center;
                }
    
                .icons-inner td {
                    margin: 0 auto;
                }
    
                .image_block img.fullWidth {
                    max-width: 100% !important;
                }
    
                .mobile_hide {
                    display: none;
                }
    
                .row-content {
                    width: 100% !important;
                }
    
                .stack .column {
                    width: 100%;
                    display: block;
                }
    
                .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                }
    
                .desktop_hide,
                .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                }
            }
        </style>
    </head>
    <body style="margin: 0; background-color: #fff; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 500px; margin: 0 auto;" width="500">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:10px;width:100%;padding-right:0px;padding-left:0px;">
    <div align="center" class="alignment" style="line-height:10px"><img alt="your-logo" src="${logo}" style="display: block; height: auto; border: 0; max-width: 125px; width: 100%;" title="your-logo" width="125"/></div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; width: 500px; margin: 0 auto;" width="500">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:5px;padding-left:5px;padding-right:5px;width:100%;">
    <div align="center" class="alignment" style="line-height:10px"><img alt="reset-password" class="fullWidth" src="images/gif-resetpass.gif" style="display: block; height: auto; border: 0; max-width: 350px; width: 100%;" title="reset-password" width="350"/></div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="text-align:center;width:100%;">
    <h1 style="margin: 0; color: #393d47; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 25px; font-weight: normal; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong>${title}</strong></h1>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad">
    <div style="color:#393d47;font-family:Tahoma,Verdana,Segoe,sans-serif;font-size:14px;line-height:150%;text-align:center;mso-line-height-alt:21px;">
    <p style="margin: 0; word-break: break-word;"><span><span>${message}</span><span>Let’s get you a new password.</span></span></p>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="15" cellspacing="0" class="button_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad">
    <div align="center" class="alignment"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.yourwebsite.com" style="height:58px;width:272px;v-text-anchor:middle;" arcsize="35%" strokeweight="0.75pt" strokecolor="#FFC727" fillcolor="#ffc727"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#393d47; font-family:Tahoma, Verdana, sans-serif; font-size:18px"><![endif]--><a href="www.yourwebsite.com" style="text-decoration:none;display:inline-block;color:#393d47;background-color:#ffc727;border-radius:20px;width:auto;border-top:1px solid #FFC727;font-weight:undefined;border-right:1px solid #FFC727;border-bottom:1px solid #FFC727;border-left:1px solid #FFC727;padding-top:10px;padding-bottom:10px;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:18px;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:50px;padding-right:50px;font-size:18px;display:inline-block;letter-spacing:normal;"><span style="word-break:break-word;"><span data-mce-style="" style="line-height: 36px;"><strong>${btnTitle}</strong></span></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
    <div style="color:#393d47;font-family:Tahoma,Verdana,Segoe,sans-serif;font-size:13px;line-height:150%;text-align:center;mso-line-height-alt:19.5px;">
    <p style="margin: 0; word-break: break-word;"><span>If you didn’t request to change your password, simply ignore this email.</span></p>
    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 500px; margin: 0 auto;" width="500">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="15" cellspacing="0" class="paragraph_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad">
    <div style="color:#393d47;font-family:Tahoma,Verdana,Segoe,sans-serif;font-size:10px;line-height:120%;text-align:center;mso-line-height-alt:12px;">
    <p style="margin: 0; word-break: break-word;"><span>This link will expire in 24 hours. If you continue to have problems</span><br/><span>please feel free to contact us at <a href="mailto:support@youremail.com" rel="noopener" style="text-decoration: underline; color: #393d47;" target="_blank" title="support@youremail.com">support@youremail.com</a>. <a href="Example.com" rel="noopener" style="text-decoration: underline; color: #393d47;" target="_blank">UNSUBSCRIBE</a></span></p>
    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 500px; margin: 0 auto;" width="500">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="html_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad">
    <div align="center" style="font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;"><div style="height:30px;"> </div></div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="social_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="text-align:center;padding-right:0px;padding-left:0px;">
    <div align="center" class="alignment">
    <table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="168px">
    <tr>
    <td style="padding:0 5px 0 5px;"><a href="https://www.facebook.com" target="_blank"><img alt="Facebook" height="32" src="images/facebook2x.png" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
    <td style="padding:0 5px 0 5px;"><a href="https://www.twitter.com" target="_blank"><img alt="Twitter" height="32" src="images/twitter2x.png" style="display: block; height: auto; border: 0;" title="Twitter" width="32"/></a></td>
    <td style="padding:0 5px 0 5px;"><a href="https://www.instagram.com" target="_blank"><img alt="Instagram" height="32" src="images/instagram2x.png" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
    <td style="padding:0 5px 0 5px;"><a href="https://www.linkedin.com" target="_blank"><img alt="LinkedIn" height="32" src="images/linkedin2x.png" style="display: block; height: auto; border: 0;" title="LinkedIn" width="32"/></a></td>
    </tr>
    </table>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="html_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad">
    <div align="center" style="font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;"><div style="margin-top: 25px;border-top:1px dashed #D6D6D6;margin-bottom: 20px;"></div></div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad">
    <div style="color:#C0C0C0;font-family:Tahoma,Verdana,Segoe,sans-serif;font-size:12px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
    <p style="margin: 0; word-break: break-word;">Duis euismod neque at lacus rutrum, nec suscipit eros tincidunt nterdum et malesuada.</p>
    <p style="margin: 0; word-break: break-word;">Fames ac ante ipsum vestibulum.</p>
    <p style="margin: 0; word-break: break-word;"> </p>
    <p style="margin: 0; word-break: break-word;">Your Street 12, 34567 AB City  /  info@example.com / (+1) 123 456 789<a href="http://www.example.com" style=""></a></p>
    <p style="margin: 0; word-break: break-word;"><span style="color:#c0c0c0;"> </span></p>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="html_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad">
    <div align="center" style="font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;"><div style="height-top: 20px;"> </div></div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; width: 500px; margin: 0 auto;" width="500">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
    <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
    <!--[if !vml]><!-->
    <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;"><!--<![endif]-->
    <tr>
    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="http://designedwithbeefree.com/" style="text-decoration: none;" target="_blank"><img align="center" alt="Beefree Logo" class="icon" height="32" src="${banner}" style="display: block; height: auto; margin: 0 auto; border: 0;" width="34"/></a></td>
    <td style="font-family: 'Inter', sans-serif; font-size: 15px; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center;"><a href="http://designedwithbeefree.com/" style="color: #1e0e4b; text-decoration: none;" target="_blank">Designed with Beefree</a></td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table><!-- End -->
    </body>
    </html>`;
};
