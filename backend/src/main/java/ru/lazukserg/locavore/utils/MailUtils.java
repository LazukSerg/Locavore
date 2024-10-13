package ru.lazukserg.locavore.utils;

import org.springframework.mail.SimpleMailMessage;
import ru.lazukserg.locavore.payload.request.Order;

public class MailUtils {

    public static SimpleMailMessage createMail(Order order, Long id, Boolean toAdmin) {
        final SimpleMailMessage simpleMail = new SimpleMailMessage();
        simpleMail.setFrom("Lazykun@mail.ru");
        simpleMail.setTo(toAdmin ? "Lazykun@mail.ru" : order.getUserEmail());
//        simpleMail.setTo(toAdmin ? "Lazykun@mail.ru" :"LazukinSS22@st.ithub.ru");
        simpleMail.setSubject("Заказ на сайте \"Локаворство\"");
        if(toAdmin) {
            simpleMail.setText("Новый заказ №:" + id + "\n" +
                    "\nДата заказа - " + order.getDateOfCreation() +
                    "\nДата самовывоза - " + order.getDateOfPickUp() +
                    "\nКоличество продукции - " + order.getCountPosition() +
                    "\nОбщая стоимость - " + order.getTotalOrder() +
                    "\nСостав заказа:" +
                    order.getProducts().entrySet().stream().map((it) -> "\n\t\t\t\t" + it.getValue().getTitle() +
                                    " - " + it.getValue().getCount() + " (" + it.getValue().getPrice() + " руб/шт)")
                            .toList().toString().replaceAll("([\\[\\]])", "") +
                    "\nЭлектронный адрес: " + order.getUserEmail() +
                    "\nНомер телефона: " + order.getUserPhone()
            );
        } else {
            simpleMail.setText("Ваш заказ №:" + id +
                "\nДата заказа - " + order.getDateOfCreation() +
                "\nДата самовывоза - " + order.getDateOfPickUp() +
                "\nКоличество продукции - " + order.getCountPosition() +
                "\nОбщая стоимость - " + order.getTotalOrder() +
                "\nСостав заказа:" +
                order.getProducts().entrySet().stream().map((it) -> "\n\t\t\t\t" + it.getValue().getTitle() +
                                " - " + it.getValue().getCount() + " (" + it.getValue().getPrice() + " руб/шт)")
                        .toList().toString().replaceAll("([\\[\\]])", "") +
                "\n\n\nЕсли с вами не связались в течении суток, просьба уточнить информацию в ответе на это письмо."
            );
        }

        return simpleMail;
    }
}
