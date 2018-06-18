User.find_or_create_by(email: 'admin@example.com') do |u| 
  u.name = "Admin User"
  u.role =  'Admin'
  u.password = 'password'
  u.password_confirmation = 'password'
end