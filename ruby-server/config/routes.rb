Rails.application.routes.draw do
  namespace :api do
    post 'life/update', to: 'life#update'
    get 'state/mode', to: 'life#get_mode'
  end
end
