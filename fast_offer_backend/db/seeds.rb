# frozen_string_literal: true

# Создаем админа AI
User.create(email: 'ai@mail.ru',
            password: 'password',
            password_confirmation: 'password',
            role: 'admin',
            username: 'AI')

# Заполняем грейды (junior, middle, senior)
ItGrade.grades.values.each { |grade| ItGrade.create(grade:) }

# Языки программирования
positions = {
  'Vue' => 'vue_73207c61b93c3cf8.png',
  'Python' => 'python_d446128c7ec97655.png',
  '1C' => '1c_e9af72d2c0654840.png',
  'Angular' => 'angular_b84fab5ee29d50c5.png',
  'C#' => 'c_acee34c98722a5e9.png',
  'DevOps' => 'devops_7fa5e5ca82d708e0.png',
  'Go' => 'go_1d21d448ee75a7d7.png',
  'Java' => 'java_df477dae31ea8f4b.png',
  'Node.js' => 'node_js_35b945eeda80be8c.png',
  'PHP' => 'php_c0699b57f76bea02.png',
  'React' => 'react_06398e53ff798bda.png',
  'Ruby on Rails' => 'ruby_on_rails_50f4a3a07d8ff827.png',
  'Swift' => 'swift_9be75489f8c922fd.png'
}

positions.each do |title, img|
  image_io = File.open(Rails.root.join("app/assets/images/positions/#{img}"))
  new_position = Position.find_or_create_by(title:)
  new_position.image.attach(
    io: image_io,
    filename: img,
    content_type: 'image/png'
  )
end
