interface EmailPayload {
  subject: string
  html: string
  text: string
}

export function buildWaitlistEmail(_email: string): EmailPayload {
  return {
    subject: 'We heard you knocking ✦',

    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <title>We heard you knocking ✦</title>
</head>

<body style="margin:0;padding:0;background-color:#080611;font-family:Georgia,'Times New Roman',serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#080611;min-height:100vh;">
  <tr>
    <td align="center" style="padding:40px 20px;">

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background-color:#0F0C1E;border:1px solid rgba(255,255,255,0.06);border-bottom:none;border-radius:12px 12px 0 0;padding:32px 36px 2px;">

            <p style="margin:0 1px 10px;font-family:Georgia,serif;font-style:italic;font-weight:600;font-size:22px;color:#EDEAF5;letter-spacing:-0.02em;">
              Miyu<span style="color:#F2A93B;">Labs</span> ⦮ ⦯ ⟆
            </p>

            <p style="margin:0 0 20px;display:inline-block;background-color:#17132D;border:1px solid rgba(255,255,255,0.06);color:#A49FBE;font-family:'Courier New',Courier,monospace;font-size:10px;padding:5px 12px;letter-spacing:0.12em;">
              [ SIGNAL RECEIVED ]
            </p>
            <div style="width:100%;height:1px;background:repeating-linear-gradient(90deg,#241D42 0px,#241D42 3px,transparent 3px,transparent 9px);opacity:0.6;margin-bottom:28px;"></div>

          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background-color:#0F0C1E;border-left:1px solid rgba(255,255,255,0.06);border-right:1px solid rgba(255,255,255,0.06);padding:0px 36px;">

            <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:16px;color:#EDEAF5;line-height:1.8;">
              hi,
            </p>

            <p style="margin:0 0 22px;font-family:Georgia,serif;font-size:15px;color:#A49FBE;line-height:1.85;">
              thank you for showing interest in MiyuLabs. your companion
              <strong style="color:#F7C46A;">Miyu :3</strong>
              is currently cooking in our workshop — we're obsessing over every detail to make sure it's nothing short of perfect.
            </p>

            <div style="width:40px;height:2px;background-color:#F2A93B;margin:28px 0;"></div>

            <p style="margin:0 0 8px;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#EDEAF5;line-height:1.8;">
              honest promise:
            </p>

            <p style="margin:0 0 22px;font-family:Georgia,serif;font-size:15px;color:#A49FBE;line-height:1.85;">
              we hate spam more than anything.
              <em>genuinely.</em>
              so we won't ever flood your inbox. only the stuff that actually matters:
            </p>

            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">

              <tr>
                <td style="padding:6px 0;vertical-align:top;">
                  <span style="color:#F2A93B;font-size:14px;margin-right:12px;font-family:'Courier New',Courier,monospace;">→</span>
                </td>

                <td style="padding:6px 0;">
                  <span style="font-family:Georgia,serif;font-size:14px;color:#A49FBE;line-height:1.7;">
                    when <strong style="color:#EDEAF5;">Miyu :3</strong> is ready to say hi to you
                  </span>
                </td>
              </tr>

              <tr>
                <td style="padding:6px 0;vertical-align:top;">
                  <span style="color:#F2A93B;font-size:14px;margin-right:12px;font-family:'Courier New',Courier,monospace;">→</span>
                </td>

                <td style="padding:6px 0;">
                  <span style="font-family:Georgia,serif;font-size:14px;color:#A49FBE;line-height:1.7;">
                    when <strong style="color:#EDEAF5;">pre-orders go live</strong>
                  </span>
                </td>
              </tr>

              <tr>
                <td style="padding:6px 0;vertical-align:top;">
                  <span style="color:#F2A93B;font-size:14px;margin-right:12px;font-family:'Courier New',Courier,monospace;">→</span>
                </td>

                <td style="padding:6px 0;">
                  <span style="font-family:Georgia,serif;font-size:14px;color:#A49FBE;line-height:1.7;">
                    something <strong style="color:#EDEAF5;">super-duper-important</strong> we wouldn't want you to miss
                  </span>
                </td>
              </tr>

            </table>

            <p style="margin:0;margin-bottom:12px;font-family:Georgia,serif;font-size:15px;color:#A49FBE;line-height:1.85;">
              that's it. nothing else. we promise.
            </p>

          </td>
        </tr>

        <!-- Sign-off -->
        <tr>
          <td style="background-color:#17132D;border-left:1px solid rgba(255,255,255,0.06);border-right:1px solid rgba(255,255,255,0.06);border-top:1px solid rgba(255,255,255,0.04);padding:28px 36px;">

            <p style="margin:0 0 4px;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#EDEAF5;line-height:1.7;">
              stay curious,
            </p>

            <p style="margin:0;font-family:Georgia,serif;font-size:15px;color:#F2A93B;font-style:italic;">
              Team MiyuLabs ✦
            </p>

          </td>
        </tr>

        <!-- Fine print -->
        <tr>
          <td style="background-color:#0F0C1E;border:1px solid rgba(255,255,255,0.06);border-top:none;border-radius:0 0 12px 12px;padding:20px 36px;">

            <div style="width:100%;height:1px;background:repeating-linear-gradient(90deg,#241D42 0px,#241D42 3px,transparent 3px,transparent 9px);opacity:0.5;margin-bottom:16px;"></div>

            <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:10px;color:#5E5878;line-height:1.8;letter-spacing:0.02em;">
              didn't sign up? just reply to this email with
              <strong style="color:#A49FBE;">"Unsubscribe"</strong>
              — no questions asked, no drama.
              we appreciate your interest either way. ♥
            </p>

          </td>
        </tr>

        <tr>
          <td style="height:32px;"></td>
        </tr>

        <tr>
          <td align="center">
            <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:9px;color:#352C58;letter-spacing:0.1em;">
              MIYULABS · something is waking up
            </p>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
</body>
</html>`,

    text: `
hi,

thank you for showing interest in MiyuLabs.

your companion Miyu :3 is currently under development. we're obsessing over every detail to make sure it's nothing short of perfect.

honest promise:
we hate spam more than anything. genuinely.

so we won't flood your inbox.
you'll only hear from us when:

→ Miyu :3 is ready to say hi to you
→ pre-orders go live
→ something super-duper-important we wouldn't want you to miss

that's it. nothing else. we promise.

stay curious,
Team MiyuLabs ✦

——

didn't sign up?
just reply with "Unsubscribe" — no questions asked.

we appreciate your interest either way. ♥
    `.trim(),
  }
}