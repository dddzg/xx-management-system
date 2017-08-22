/**
 * @file 测试辅助文件
 */
import { getConnection } from 'typeorm'
import { User } from '../entities'
import { ArticleReadersUserRepository, ArticleRepository, CategoryRepository, CommentRepository,
         GameRepository, NotificationRepository, NotificationSubscribersUserRepository, UserRepository
} from '../repositories'

// customRepository
export const getCustomRepository = () => ({
  articleReadersUserRepository: getConnection().getCustomRepository(ArticleReadersUserRepository),
  articleRepository: getConnection().getCustomRepository(ArticleRepository),
  categoryRepository: getConnection().getCustomRepository(CategoryRepository),
  commentRepository: getConnection().getCustomRepository(CommentRepository),
  gameRepository: getConnection().getCustomRepository(GameRepository),
  notificationRepository: getConnection().getCustomRepository(NotificationRepository),
  notificationSubscribersUserRepository: getConnection().getCustomRepository(NotificationSubscribersUserRepository),
  userRepository: getConnection().getCustomRepository(UserRepository)
})

// test data
export const getUser: () => Promise<User> = async () => getConnection().getCustomRepository(UserRepository).findOne({ username: 'test' }) as Promise<User>
