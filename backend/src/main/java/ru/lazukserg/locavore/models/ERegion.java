package ru.lazukserg.locavore.models;

import java.util.Arrays;

public enum ERegion {
   RESPUBLIKA_ADYGEYA  ("Республика Адыгея"),
   RESPUBLIKA_ALTAY ("Республика Алтай"),
   RESPUBLIKA_BASHKORTOSTAN  ("Республика Башкортостан"),
   RESPUBLIKA_BURYATIA  ("Республика Бурятия"),
   RESPUBLIKA_DAGESTAN  ("Республика Дагестан"),
   RESPUBLIKA_INGUSHETIYA  ("Республика Ингушетия"),
   KABARDINO_BALKARSKAYA_RESPUBLIKA  ("Кабардино-Балкарская Республика"),
   RESPUBLIKA_KALMYKIA  ("Республика Калмыкия"),
   KARACHAEVO_CHERKESSKAYA_RESPUBLIKA  ("Карачаево-Черкесская Республика"),
   RESPUBLIKA_KARELYA  ("Республика Карелия"),
   RESPUBLIKA_KOMI  ("Республика Коми"),
   RESPUBLIKA_KRYM  ("Республика Крым"),
   RESPUBLIKA_MARI_EL  ("Республика Марий Эл"),
   RESPUBLIKA_MORDOVIA  ("Республика Мордовия"),
   RESPUBLIKA_SAKHA_YAKUTIYA  ("Республика Саха (Якутия)"),
   RESPUBLIKA_SEVERNAYA_OSETIYA_ALANIA  ("Республика Северная Осетия — Алания"),
   RESPUBLIKA_TATARSTAN  ("Республика Татарстан"),
   RESPUBLIKA_TYVA  ("Республика Тыва"),
   UDMURTSKAYA_RESPUBLIKA  ("Удмуртская Республика"),
   RESPUBLIKA_KHAKASIA  ("Республика Хакасия"),
   CECHENSKAYA_RESPUBLIKA  ("Чеченская Республика"),
   CHUVASHSKAYA_RESPUBLIKA  ("Чувашская Республика"),
   DONETSKAYA_NARODNAYA_RESPUBLIKA  ("Донецкая Народная Республика"),
   LUGANSKAYA_NARODNAYA_RESPUBLIKA  ("Луганская Народная Республика"),
   ALTAYSKIY_KRAY  ("Алтайский край"),
   ZABAYKALSKIY_KRAY  ("Забайкальский край"),
   KAMCHATSKIY_KRAY  ("Камчатский край"),
   КРASNODARSKIY_KRAY  ("Краснодарский край"),
   КРASNOYARSKIY_KRAY  ("Красноярский край"),
   PERMSKIY_KRAY  ("Пермский край"),
   PRIMORSKIY_KRAY  ("Приморский край"),
   STAVROPOLSKIY_KRAY  ("Ставропольский край"),
   KHABAROVSKIY_KRAY  ("Хабаровский край"),
   AMURSKAYA_OBLAST  ("Амурская область"),
   ARKHANGELSKAYA_OBLAST  ("Архангельская область"),
   ASTRAKHANSKAYA_OBLAST  ("Астраханская область"),
   BELGORODSKAYA_OBLAST  ("Белгородская область"),
   БРYANSKAYA_OBLAST  ("Брянская область"),
   VLADIMIRSKAYA_OBLAST  ("Владимирская область"),
   VOLGOGRADSKAYA_OBLAST  ("Волгоградская область"),
   VOLOGODSKAYA_OBLAST  ("Вологодская область"),
   VORONEZHSKAYA_OBLAST  ("Воронежская область"),
   IVANOVSKAYA_OBLAST  ("Ивановская область"),
   IRKUTSKAYA_OBLAST  ("Иркутская область"),
   KALININGRADSKAYA_OBLAST  ("Калининградская область"),
   KALUZHSKAYA_OBLAST  ("Калужская область"),
   KEMEROVSKAYA_OBLAST_KUZBASS  ("Кемеровская область — Кузбасс"),
   KIROVSKAYA_OBLAST  ("Кировская область"),
   KOSTROMSKAYA_OBLAST  ("Костромская область"),
   KURGANSKAYA_OBLAST  ("Курганская область"),
   KURSKAYA_OBLAST  ("Курская область"),
   LENINGRADSKAYA_OBLAST  ("Ленинградская область"),
   LIPETSKAYA_OBLAST  ("Липецкая область"),
   MAGADANSKAYA_OBLAST  ("Магаданская область"),
   MOSKOVSKAYA_OBLAST  ("Московская область"),
   MURMANSKAYA_OBLAST  ("Мурманская область"),
   NIZHEGORODSKAYA_OBLAST  ("Нижегородская область"),
   NOVGORODSKAYA_OBLAST  ("Новгородская область"),
   NOVOSIBIRSKAYA_OBLAST  ("Новосибирская область"),
   OMSKAYA_OBLAST  ("Омская область"),
   ORENBURGSKAYA_OBLAST  ("Оренбургская область"),
   ORLOVSKAYA_OBLAST  ("Орловская область"),
   PENZENSKAYA_OBLAST  ("Пензенская область"),
   PSKOVSKAYA_OBLAST  ("Псковская область"),
   ROSTOVSKAYA_OBLAST  ("Ростовская область"),
   RYAZANSKAYA_OBLAST  ("Рязанская область"),
   SAMARSKAYA_OBLAST  ("Самарская область"),
   SARATOVSKAYA_OBLAST  ("Саратовская область"),
   SAKHALINSKAYA_OBLAST  ("Сахалинская область"),
   SVERDLOVSKAYA_OBLAST  ("Свердловская область"),
   SMОЛENSKAYA_OBLAST  ("Смоленская область"),
   TАМBOVSKAYA_OBLAST  ("Тамбовская область"),
   TVERSKAYA_OBLAST  ("Тверская область"),
   TOMSKAYA_OBLAST  ("Томская область"),
   TULSKAYA_OBLAST  ("Тульская область"),
   TYUMENSKAYA_OBLAST  ("Тюменская область"),
   ULJANOVSKAYA_OBLAST  ("Ульяновская область"),
   CHELYABINSKAYA_OBLAST  ("Челябинская область"),
   YAROSLAVSKAYA_OBLAST  ("Ярославская область"),
   GOROD_MOSKVA  ("Город Москва"),
   GOROD_SANKT_PETERBURG  ("Город Санкт-Петербург"),
   GOROD_SEVASTOPOL  ("Город Севастополь"),
   YEVREYSKAYA_AVTONOMNAYA_OBLAST  ("Еврейская автономная область"),
   NENETSKIY_AVTONOMNYY_OKRUG  ("Ненецкий автономный округ"),
   KHANTY_MANSIYSKIY_AVTONOMNYY_OKRUG_YUGRA  ("Ханты-Мансийский автономный округ — Югра"),
   CHUKOTSKIY_AVTONOMNYY_OKRUG  ("Чукотский автономный округ"),
   YAMALO_NENETSKIY_AVTONOMNYY_OKRUG  ("Ямало-Ненецкий автономный округ"),
   ZAPOROZHSKAYA_OBLAST  ("Запорожская область"),
   KHERSONSKAYA_OBLAST  ("Херсонская область");

    private final String displayName;

    ERegion(String displayName) {
        this.displayName = displayName;
    }

   public String getDisplayName() {
      return displayName;
   }

   public static ERegion valueOfString(String name) {
      return Arrays.stream(ERegion.values())
              .filter(region -> region.name().equals(name))
              .findFirst().orElseThrow(() -> new IllegalArgumentException("Нет региона с названием '" + name + "'"));
   }


}
