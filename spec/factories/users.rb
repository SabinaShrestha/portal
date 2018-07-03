FactoryBot.define do
  factory :user do
    password "password"
    first_name "user_first"
    last_name "user_last"
    bio "about me"
    image "https://media-exp2.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAKLAAAAJGZlMDA2Nzk5LWNjNzItNDk3Mi05ZDZhLTQ1M2RlNTRjM2MxYQ.jpg"
    nickname "bot"
    sequence(:email) { |n| "user#{n}@test.com" }

    factory :admin do
      admin true
    end
  end
end
